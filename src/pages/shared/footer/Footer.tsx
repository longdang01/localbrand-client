'use client';

import { Col, Divider, Flex, Row, Typography } from 'antd';
import styles from './Footer.module.scss';
import { RiFacebookFill } from 'react-icons/ri';
import { FaInstagram } from 'react-icons/fa';
import { AiOutlineTikTok } from 'react-icons/ai';
import { useTranslations } from 'next-intl';

const Footer = () => {
  const t = useTranslations('footer');

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
                  <Typography.Link>{t('about.introduction')}</Typography.Link>
                  <Typography.Link>{t('about.contact')}</Typography.Link>
                </Flex>
              </Col>
              <Col span={24} md={12} lg={6}>
                <Typography.Title className={styles.title}>
                  {t('account.title')}
                </Typography.Title>
                <Flex vertical className={styles.list}>
                  <Typography.Link>{t('account.login')}</Typography.Link>
                  <Typography.Link>{t('account.signup')}</Typography.Link>
                </Flex>
              </Col>
              <Col span={24} md={12} lg={6}>
                <Typography.Title className={styles.title}>
                  {t('policy.title')}
                </Typography.Title>
                <Flex vertical className={styles.list}>
                  <Typography.Link>
                    {t('policy.purchase_support')}
                  </Typography.Link>
                  <Typography.Link>{t('policy.faq')}</Typography.Link>
                  <Typography.Link>{t('policy.privacy')}</Typography.Link>
                  <Typography.Link>{t('policy.usage')}</Typography.Link>
                </Flex>
              </Col>
            </Row>
          </div>

          <Divider className={styles.divider} />

          <Flex align="center" justify="start" className={styles.bottom}>
            <Typography.Link className={styles.item}>
              {t('policy.privacy')}
            </Typography.Link>
            <Typography.Link className={styles.item}>
              {t('policy.usage')}
            </Typography.Link>
            <Typography.Text className={styles.item}>
              <Typography.Text>
                © {new Date().getFullYear()}. {t('copyright')}{' '}
              </Typography.Text>
              <Typography.Link target="_blank" href="#" className={styles.item}>
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
