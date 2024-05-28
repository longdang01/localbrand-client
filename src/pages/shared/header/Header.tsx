"use client"

import { Flex, Space, Typography } from 'antd';
import styles from './Header.module.scss';
import LanguagesSwitcher from '../languages-switcher/LanguagesSwitcher';
import { useTranslations } from 'next-intl';

const Header = () => {
  const t = useTranslations("header");
  
  return (
    <>
      <div className={styles.header}>
        <div className={styles.topbar}>
          <div className="layout-client">
            <Flex className={styles.inner} align="center" justify="space-between">
              <LanguagesSwitcher />

              <Space align='center'>
                <Typography.Link>{t("purchase_support")}</Typography.Link>
                <Typography.Link>{t("login")}</Typography.Link>
                <Typography.Link>{t("signup")}</Typography.Link>
              </Space>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
