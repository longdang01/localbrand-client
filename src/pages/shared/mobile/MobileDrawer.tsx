import { VscThreeBars } from 'react-icons/vsc';
import styles from './Mobile.module.scss';
import { Button, Drawer, Flex, Menu, MenuProps } from 'antd';
import { useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { ABOUT_CONTACT, ABOUT_INTRODUCE, COLLECTION } from '@/paths';
import { useRouter } from 'next/navigation';
import { FaAngleRight } from 'react-icons/fa';
import { MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '@/constants/config';
import { useSearchCategoriesBig } from '@/loaders/category-big.loader';
import { CategoryBigProps } from '@/models/category-big';

const MobileDrawer = () => {
  const t = useTranslations('header');
  const [open, setOpen] = useState(false);
  const locale = useLocale();
  const router = useRouter();

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const searchCategoriesBig = useSearchCategoriesBig({
    params: {
      pageIndex: MIN_PAGE_SIZE,
      pageSize: MAX_PAGE_SIZE,
      searchData: '',
    },
  });

  const ITEMS_DROPDOWN: MenuProps['items'] = [
    {
      key: `/${locale}`,
      label: t('fields.home'),
    },
    {
      key: '2',
      label: t('fields.shop'),
      expandIcon: (
        <Flex justify="center" align="center">
          <FaAngleRight />
        </Flex>
      ),
      children: searchCategoriesBig?.data?.categories?.map(
        (category: CategoryBigProps) => ({
          key: `/${locale}/c/${category?.path}`,
          label: category?.categoryName,
        }),
      ),
    },
    {
      key: `/${locale}${COLLECTION}`,
      label: t('fields.collection'),
    },
    {
      key: `/${locale}${ABOUT_INTRODUCE}`,
      label: t('fields.introduction'),
    },
    {
      key: `/${locale}${ABOUT_CONTACT}`,
      label: t('fields.contact'),
    },
    // {
    //   key: '2',
    //   label: 'BOTTOM',
    //   expandIcon: (
    //     <Flex justify="center" align="center">
    //       <FaAngleRight />
    //     </Flex>
    //   ),
    //   children: [
    //     {
    //       key: '2-1',
    //       label: 'Trouser',
    //     },
    //     {
    //       key: '2-2',
    //       label: 'Jeans',
    //     },
    //   ],
    // },
  ];

  const handleClick = (e: any) => {
    if (e?.key != '2') {
      router?.push(e?.key);
    }
  };

  return (
    <>
      <Button
        shape="circle"
        icon={<VscThreeBars />}
        className={styles.btnBar}
        onClick={showDrawer}
      />
      <Drawer title={t('mobile.title')} onClose={onClose} open={open}>
        <Menu onClick={handleClick} mode="inline" items={ITEMS_DROPDOWN} />
      </Drawer>
    </>
  );
};

export default MobileDrawer;
