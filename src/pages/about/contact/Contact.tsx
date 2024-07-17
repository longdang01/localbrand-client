'use client';

import { Col, Flex, Row, Typography } from 'antd';
import styles from './Contact.module.scss';
import Image from 'next/image';
import logo from '@/assets/images/logo/logo2.jpg';
import { useTranslations } from 'next-intl';
import { LuFacebook } from 'react-icons/lu';
import { RiTiktokLine, RiTwitterXLine } from 'react-icons/ri';
import { useMediaQuery } from '@/utils/responsive';

const Contact = () => {
  const t = useTranslations('about');
  const mobile = useMediaQuery(`(max-width: 768px)`);

  return (
    <>
      <div className="layout-client">
        <div className={styles.contactLayout}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={8} lg={8}>
              <div
                className={styles.box}
                style={{ width: mobile ? '100%' : 400 }}
              >
                <div>
                  <div>
                    <Image
                      src={logo}
                      alt={'logo'}
                      className={styles.logoChild}
                    />
                  </div>
                  <Typography.Text className={styles.boxContent}>
                    {t('contact.box.info1.title')}
                  </Typography.Text>
                  <Typography.Title className={styles.boxInfo}>
                    {t('contact.box.info1.1')}
                  </Typography.Title>
                  <Typography.Title className={styles.boxInfo}>
                    {t('contact.box.info1.2')}
                  </Typography.Title>
                  <Typography.Title className={styles.boxInfo}>
                    {t('contact.box.info1.3')}
                  </Typography.Title>
                </div>
              </div>
            </Col>
            <Col span={24} md={8} lg={8}>
              <div
                className={styles.box}
                style={{ width: mobile ? '100%' : 400 }}
              >
                <div>
                  <div>
                    <Image
                      src={logo}
                      alt={'logo'}
                      className={styles.logoChild}
                    />
                  </div>
                  <Typography.Text className={styles.boxContent}>
                    {t('contact.box.info2.title')}
                  </Typography.Text>
                  <Typography.Title className={styles.boxInfo}>
                    {t('contact.box.info2.1')}
                  </Typography.Title>
                  <Flex>
                    <Typography.Link href="#" className={styles.social}>
                      <LuFacebook />
                    </Typography.Link>
                    <Typography.Link href="#" className={styles.social}>
                      <RiTwitterXLine />
                    </Typography.Link>
                    <Typography.Link href="#" className={styles.social}>
                      <RiTiktokLine />
                    </Typography.Link>
                  </Flex>
                </div>
              </div>
            </Col>
            <Col span={24} md={8} lg={8}>
              <div
                className={styles.box}
                style={{ width: mobile ? '100%' : 400 }}
              >
                <div>
                  <div>
                    <Image
                      src={logo}
                      alt={'logo'}
                      className={styles.logoChild}
                    />
                  </div>
                  <Typography.Text className={styles.boxContent}>
                    {t('contact.box.info3.title')}
                  </Typography.Text>
                  <Typography.Title className={styles.boxInfo}>
                    {t('contact.box.info3.1')}
                  </Typography.Title>
                  <Typography.Title className={styles.boxInfo}>
                    {t('contact.box.info3.2')}
                  </Typography.Title>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Contact;
