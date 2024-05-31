'use client';

import {
  Button,
  Dropdown,
  Flex,
  Input,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import styles from './Header.module.scss';
import { useTranslations } from 'next-intl';
import logo from '@/assets/images/logo/logo.jpg';
import Image from 'next/image';
import { SearchOutlined, UserOutlined } from '@ant-design/icons';
import { RiShoppingCartLine } from 'react-icons/ri';
import { FaAngleDown } from 'react-icons/fa';
import { ITEMS_DROPDOWN } from './constants/Header.constants';
import MobileDrawer from '../mobile/MobileDrawer';
import { useSearchCategoriesBig } from '@/loaders/category-big.loader';
import { MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '@/constants/config';
import { CategoryBigProps } from '@/models/category-big';

const Header = () => {
  const t = useTranslations('header');

  const searchCategoriesBig = useSearchCategoriesBig({
    params: {
      pageIndex: MIN_PAGE_SIZE,
      pageSize: MAX_PAGE_SIZE,
      searchData: '',
    },
  });

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
                <Typography.Link>{t('fields.home')}</Typography.Link>
                <Dropdown
                  menu={{
                    items: searchCategoriesBig?.data?.categories?.map(
                      (category: CategoryBigProps) => ({
                        key: category?._id,
                        label: category?.categoryName,
                      }),
                    ),
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
                <Typography.Link>{t('fields.collection')}</Typography.Link>
                <Typography.Link>{t('fields.introduction')}</Typography.Link>
                <Typography.Link>{t('fields.contact')}</Typography.Link>
              </Space>

              <Flex align="center">
                <Input
                  addonBefore={<SearchOutlined />}
                  placeholder={t('search_here')}
                  className={styles.searchBar}
                  readOnly
                />

                <Tooltip title={t('fields.search')}>
                  <Button
                    shape="circle"
                    icon={<SearchOutlined />}
                    className={styles.btnSearch}
                  />
                </Tooltip>

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

                <Dropdown menu={{ items: ITEMS_DROPDOWN }} trigger={['click']}>
                  <Button
                    shape="circle"
                    icon={<UserOutlined />}
                    className={styles.btnProfile}
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
