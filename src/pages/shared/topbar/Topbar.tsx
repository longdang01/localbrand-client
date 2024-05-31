'use client';

import { Flex, Space, Tooltip, Typography } from 'antd';
import styles from './Topbar.module.scss';
import LanguagesSwitcher from '../languages-switcher/LanguagesSwitcher';
import { BiSupport } from 'react-icons/bi';
import { RiLoginCircleLine } from 'react-icons/ri';
import { LuUserPlus2 } from 'react-icons/lu';
import { useTranslations } from 'next-intl';
import { LOGIN_PATH, SIGNUP_PATH } from '@/paths';
import Link from 'next/link';

interface Props {
  locale?: string;
}

const Topbar = ({ locale }: Props) => {
  const t = useTranslations('topbar');

  return (
    <>
      <div className={styles.topbar}>
        <div className="layout-client">
          <Flex className={styles.inner} align="center" justify="space-between">
            <LanguagesSwitcher />

            <Space align="center" className={styles.list}>
              <Tooltip title={t('purchase_support')} placement="bottomRight">
                <Typography.Link>
                  <Flex align="center" gap={4}>
                    <BiSupport />
                    <Typography.Text>{t('purchase_support')}</Typography.Text>
                  </Flex>
                </Typography.Link>
              </Tooltip>
              <Tooltip title={t('login')} placement="bottomRight">
                <Link href={`/${locale}/${LOGIN_PATH}`}>
                  <Flex align="center" gap={4}>
                    <RiLoginCircleLine />
                    <Typography.Text>{t('login')}</Typography.Text>
                  </Flex>
                </Link>
              </Tooltip>
              <Tooltip title={t('signup')} placement="bottomRight">
                <Link href={`/${locale}/${SIGNUP_PATH}`}>
                  <Flex align="center" gap={4}>
                    <LuUserPlus2 />
                    <Typography.Text>{t('signup')}</Typography.Text>
                  </Flex>
                </Link>
              </Tooltip>
            </Space>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Topbar;
