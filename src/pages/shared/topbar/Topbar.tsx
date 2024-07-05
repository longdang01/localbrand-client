'use client';

import { Flex, Space, Tooltip, Typography } from 'antd';
import styles from './Topbar.module.scss';
import LanguagesSwitcher from '../languages-switcher/LanguagesSwitcher';
import { BiSupport } from 'react-icons/bi';
import { RiLoginCircleLine } from 'react-icons/ri';
import { LuUserPlus2 } from 'react-icons/lu';
import { useLocale, useTranslations } from 'next-intl';
import { LOGIN_PATH, SIGNUP_PATH, SUPPORT_PURCHASE } from '@/paths';
import Link from 'next/link';
import { FaRegHandPeace } from 'react-icons/fa';
import { useGetMe } from '@/loaders/auth.loader';
import { ACCESS_TOKEN } from '@/constants/config';
import storage from '@/utils/storage';
import { useLoginState } from '@/stores/user.store';

const Topbar = () => {
  const t = useTranslations('topbar');
  const locale = useLocale();
  const [logged, setLogged] = useLoginState((state) => [
    state.logged,
    state.setLogged,
  ]);

  const currentUser = useGetMe({
    enabled: !!storage.getStorage(ACCESS_TOKEN),
    config: {
      onSuccess: () => {
        setLogged(true);
      },
    },
  });

  return (
    <>
      <div className={styles.topbar}>
        <div className="layout-client">
          <Flex className={styles.inner} align="center" justify="space-between">
            <LanguagesSwitcher />

            <Space align="center" className={styles.list}>
              <Tooltip title={t('purchase_support')} placement="bottomRight">
                <Link href={`/${locale}/${SUPPORT_PURCHASE}`}>
                  <Flex align="center" gap={4}>
                    <BiSupport />
                    <Typography.Text>{t('purchase_support')}</Typography.Text>
                  </Flex>
                </Link>
              </Tooltip>

              {!logged ? (
                <>
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
                </>
              ) : (
                currentUser?.data && (
                  <Typography.Text>
                    <Flex align="center" gap={4}>
                      <FaRegHandPeace />
                      <Typography.Text>
                        Hi, {currentUser?.data?.customer?.customerName}
                      </Typography.Text>
                    </Flex>
                  </Typography.Text>
                )
              )}
            </Space>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Topbar;
