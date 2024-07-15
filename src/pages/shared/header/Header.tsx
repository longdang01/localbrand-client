'use client';

import {
  Button,
  Dropdown,
  Flex,
  Input,
  MenuProps,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import styles from './Header.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import logo from '@/assets/images/logo/logo.jpg';
import Image from 'next/image';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FaAngleDown } from 'react-icons/fa';
import MobileDrawer from '../mobile/MobileDrawer';
import { useSearchCategoriesBig } from '@/loaders/category-big.loader';
import {
  ACCESS_TOKEN,
  MAX_PAGE_SIZE,
  MIN_PAGE_SIZE,
  ROLE,
} from '@/constants/config';
import { CategoryBigProps } from '@/models/category-big';
import {
  ABOUT_CONTACT,
  ABOUT_INTRODUCE,
  ACCOUNT_ADDRESS,
  ACCOUNT_CHANGE_PASSWORD,
  ACCOUNT_ORDER,
  ACCOUNT_PROFILE,
  COLLECTION,
  LOGIN_PATH,
} from '@/paths';
import { MdOutlineAccountCircle } from 'react-icons/md';
import { MdOutlineShoppingBag } from 'react-icons/md';
import { MdOutlinePlace } from 'react-icons/md';
import { MdLockOutline } from 'react-icons/md';
import { IoPower } from 'react-icons/io5';
import storage from '@/utils/storage';
import { useRouter } from 'next/navigation';
import { ItemType } from 'antd/es/menu/interface';
import useStorage from '@/utils/use-storage';
import { useLoginState } from '@/stores/user.store';
import Link from 'next/link';
import ProductSearch from '../search/ProductSearch';

const Header = () => {
  const t = useTranslations('header');
  const router = useRouter();
  const locale = useLocale();
  const [, , clearAccessToken] = useStorage(ACCESS_TOKEN);
  const [logged, setLogged] = useLoginState((state) => [
    state.logged,
    state.setLogged,
  ]);

  const searchCategoriesBig = useSearchCategoriesBig({
    params: {
      pageIndex: MIN_PAGE_SIZE,
      pageSize: MAX_PAGE_SIZE,
      searchData: '',
    },
  });

  const handleLogout = () => {
    setLogged(false);

    storage.clearStorage(ACCESS_TOKEN);
    storage.clearStorage(ROLE);
    clearAccessToken();

    setTimeout(() => {
      router.push(`/${locale}`);
    }, 300);
  };

  const handleOpenAccount = (e: ItemType) => {
    switch (e?.key) {
      case 'logout':
        handleLogout();
        return;
    }

    router.push(`/${locale}/${e?.key}`);
  };

  const PROFILE_DROPDOWN: MenuProps['items'] = [
    {
      key: ACCOUNT_PROFILE,
      label: t('account.profile'),
      icon: <MdOutlineAccountCircle />,
    },
    {
      key: ACCOUNT_ORDER,
      label: t('account.order'),
      icon: <MdOutlineShoppingBag />,
    },
    {
      key: ACCOUNT_ADDRESS,
      label: t('account.address'),
      icon: <MdOutlinePlace />,
    },
    {
      key: ACCOUNT_CHANGE_PASSWORD,
      label: t('account.change_password'),
      icon: <MdLockOutline />,
    },
    {
      key: 'logout',
      label: t('account.logout'),
      icon: <IoPower />,
    },
  ];

  const handleChangeCategory = (e:any) => {
    router.push(`/${locale}/c/${e?.key}`);
  } 

  return (
    <>
      <div className={styles.header}>
        <div className={styles.main}>
          <div className="layout-client">
            <Flex
              align="center"
              justify="space-between"
              className={styles.inner}
            >
              <div className={styles.logo}>
                <Image src={logo} alt="logo" />
              </div>

              <Space align="center" className={styles.list}>
                <Link href={`/${locale}`}>{t('fields.home')}</Link>
                <Dropdown
                  menu={{
                    items: searchCategoriesBig?.data?.categories?.map(
                      (category: CategoryBigProps) => ({
                        key: category?.path,
                        label: category?.categoryName,
                      }),
                    ),
                    onClick: handleChangeCategory
                  }}
                  trigger={['click']}
                >
                  <Typography.Link onClick={(e) => e.preventDefault()}>
                    <Space align="center" size={[4, 4]}>
                      {t('fields.shop')}
                      <Flex>
                        <FaAngleDown />
                      </Flex>
                    </Space>
                  </Typography.Link>
                </Dropdown>
                <Link href={`/${locale}/${COLLECTION}`}>
                  {t('fields.collection')}
                </Link>
                <Link href={`/${locale}/${ABOUT_INTRODUCE}`}>
                  {t('fields.introduction')}
                </Link>
                <Link href={`/${locale}/${ABOUT_CONTACT}`}>
                  {t('fields.contact')}
                </Link>
              </Space>

              <Flex align="center">
                <ProductSearch />

                <Tooltip title={t('fields.cart')}>
                  <div className={styles.cart}>
                    <Button
                      shape="circle"
                      icon={<RiShoppingCartLine />}
                      className={styles.btnCart}
                    />
                    <Flex
                      justify="center"
                      align="center"
                      className={styles.quantity}
                    >
                      1
                    </Flex>
                  </div>
                </Tooltip>

                <Dropdown
                  menu={{
                    items: logged ? PROFILE_DROPDOWN : [],
                    onClick: handleOpenAccount,
                  }}
                  trigger={['click']}
                >
                  <Button
                    shape="circle"
                    icon={<UserOutlined />}
                    className={styles.btnProfile}
                    onClick={() =>
                      !logged && router.push(`/${locale}/${LOGIN_PATH}`)
                    }
                  />
                </Dropdown>

                <MobileDrawer />
              </Flex>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
