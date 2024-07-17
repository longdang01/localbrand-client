'use client';

import { Col, Divider, Flex, Row, Typography } from 'antd';
import styles from './Footer.module.scss';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineTikTok } from 'react-icons/ai';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import {
  ABOUT_CONTACT,
  ABOUT_INTRODUCE,
  LOGIN_PATH,
  SIGNUP_PATH,
  SUPPORT_FAQ,
  SUPPORT_PRIVACY,
  SUPPORT_PURCHASE,
  SUPPORT_USAGE,
} from '@/paths';

const Footer = () => {
  const t = useTranslations('footer');
  const locale = useLocale();

  return (
    <>
      <div className={styles.footer}>
        <div className="layout-client">
          <div>
            <Row gutter={[24, 24]} className={styles.top}>
              <Col span={24} md={12} lg={6}>
                <Typography.Title className={styles.title}>
                  {t('support.title')}
                </Typography.Title>
                <Flex vertical className={styles.list}>
                  <Typography.Link>
                    <RiFacebookFill />
                    <Typography.Text>{t('support.facebook')}</Typography.Text>
                  </Typography.Link>
                  <Typography.Link>
                    <FaInstagram />
                    <Typography.Text>{t('support.instagram')}</Typography.Text>
                  </Typography.Link>
                  <Typography.Link>
                    <AiOutlineTikTok />
                    <Typography.Text>{t('support.tiktok')}</Typography.Text>
                  </Typography.Link>
                </Flex>
              </Col>
              <Col span={24} md={12} lg={6}>
                <Typography.Title className={styles.title}>
                  {t('about.title')}
                </Typography.Title>
                <Flex vertical className={styles.list}>
                  <Link href={`/${locale}/${ABOUT_INTRODUCE}`}>
                    {t('about.introduction')}
                  </Link>
                  <Link href={`/${locale}/${ABOUT_CONTACT}`}>
                    {t('about.contact')}
                  </Link>
                </Flex>
              </Col>
              <Col span={24} md={12} lg={6}>
                <Typography.Title className={styles.title}>
                  {t('account.title')}
                </Typography.Title>
                <Flex vertical className={styles.list}>
                  <Link href={`/${locale}/${LOGIN_PATH}`}>
                    {t('account.login')}
                  </Link>
                  <Link href={`/${locale}/${SIGNUP_PATH}`}>
                    {t('account.signup')}
                  </Link>
                </Flex>
              </Col>
              <Col span={24} md={12} lg={6}>
                <Typography.Title className={styles.title}>
                  {t('policy.title')}
                </Typography.Title>
                <Flex vertical className={styles.list}>
                  <Link href={`/${locale}/${SUPPORT_PURCHASE}`}>
                    {t('policy.purchase_support')}
                  </Link>
                  <Link href={`/${locale}/${SUPPORT_FAQ}`}>
                    {t('policy.faq')}
                  </Link>
                  <Link href={`/${locale}/${SUPPORT_PRIVACY}`}>
                    {t('policy.privacy')}
                  </Link>
                  <Link href={`/${locale}/${SUPPORT_USAGE}`}>
                    {t('policy.usage')}
                  </Link>
                </Flex>
              </Col>
            </Row>
          </div>

          <Divider className={styles.divider} />

          <Flex align="center" justify="flex-start" className={styles.bottom}>
            <Link
              href={`/${locale}/${SUPPORT_PRIVACY}`}
              className={styles.item}
            >
              {t('policy.privacy')}
            </Link>
            <Link href={`/${locale}/${SUPPORT_USAGE}`} className={styles.item}>
              {t('policy.usage')}
            </Link>
            <Typography.Text className={styles.item}>
              <Typography.Text>
                © {new Date().getFullYear()}. {t('copyright')}{' '}
              </Typography.Text>
              <Typography.Link
                target="_blank"
                href="#"
                className={styles.brand}
              >
                FRAGILE
              </Typography.Link>
            </Typography.Text>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default Footer;
