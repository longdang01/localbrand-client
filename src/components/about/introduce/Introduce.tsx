'use client';

import { Col, Flex, Row, Typography } from 'antd';
import logo from '@/assets/images/logo/logo2.jpg';
import Image from 'next/image';
import styles from './Introduce.module.scss';
import { HomeOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/utils/responsive';

const Introduce = () => {
  const t = useTranslations('about');
  const mobile = useMediaQuery(`(max-width: 768px)`);

  return (
    <>
      <div className={styles.introduceLayout}>
        <div className="layout-client">
          <Row gutter={[24, 24]} className={styles.section}>
            <Col span={24} md={8} lg={8}>
              <Image
                src={logo}
                alt={'logo'}
                className={styles.logo}
                style={{ width: mobile ? '100%' : 400 }}
              />
            </Col>
            <Col span={24} md={16} lg={16}>
              <div className={styles.content}>
                <div>
                  <Flex align="center">
                    <HomeOutlined />
                    <Typography.Text className={styles.title}>
                      {t('introduce.title')}
                    </Typography.Text>
                  </Flex>
                  <Typography.Title className={styles.content1}>
                    {t('introduce.content.1')}
                  </Typography.Title>
                  <Flex>
                    <Typography.Text
                      style={{ fontWeight: 'bold', marginRight: 5 }}
                    >
                      {`${t('introduce.brand.1')}`}
                    </Typography.Text>
                    <Typography.Text>
                      {`${t('introduce.content.2')}`}
                    </Typography.Text>
                  </Flex>
                  <Typography.Paragraph className={styles.paraph}>
                    {t('introduce.content.3')}
                  </Typography.Paragraph>
                  <Typography.Paragraph className={styles.paraph}>
                    {t('introduce.content.4')}
                  </Typography.Paragraph>
                </div>
              </div>
            </Col>
          </Row>

          <Row gutter={[24, 24]} className={styles.section}>
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
                    {t('introduce.box.1')}
                  </Typography.Text>
                  <Typography.Text className={styles.boxBrand}>
                    {t('introduce.brand.2')}
                  </Typography.Text>
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
                    {t('introduce.box.2')}
                  </Typography.Text>
                  <Typography.Text className={styles.boxBrand}>
                    {t('introduce.brand.2')}
                  </Typography.Text>
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
                    {t('introduce.box.3')}
                  </Typography.Text>
                  <Typography.Text className={styles.boxBrand}>
                    {t('introduce.brand.2')}
                  </Typography.Text>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Introduce;
