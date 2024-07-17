'use client';

import { Button, Col, Flex, Row, Skeleton, Spin, Typography } from 'antd';
import styles from './Collection.module.scss';
import logo from '@/assets/images/logo/logo2.jpg';
import Image from 'next/image';
import { EyeOutlined } from '@ant-design/icons';
import { useSearchCollections } from '@/loaders/collection.loader';
import { CollectionProps } from '@/models/collection';
import { useLocale, useTranslations } from 'next-intl';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Collection = () => {
  const t = useTranslations('collection');
  const router = useRouter();
  const locale = useLocale();

  const searchCollections = useSearchCollections({
    params: {
      searchData: '',
    },
  });

  return (
    <>
      <div className={styles.collectionLayout}>
        <div className="layout-client">
          <Row gutter={[24, 24]}>
            {searchCollections?.isLoading
              ? [...Array(4)]?.map((_, index: number) => (
                  <Col span={24} md={12} lg={12} key={index}>
                    <Skeleton.Image
                      active
                      style={{ width: '100%', height: 180 }}
                    />
                  </Col>
                ))
              : searchCollections?.data?.collections?.map(
                  (collection: CollectionProps, index: number) => (
                    <Col span={24} md={12} lg={12} key={index}>
                      <Flex
                        align="center"
                        justify="space-between"
                        className={styles.collection}
                      >
                        <Link
                          href={`/${locale}/collection/${collection?.path}`}
                        >
                          <Image
                            src={
                              collection?.collectionImages[0]?.picture || logo
                            }
                            alt="Logo"
                            className={styles.image}
                            width={120}
                            height={120}
                            objectFit="cover"
                          />
                        </Link>

                        <Flex
                          justify="center"
                          vertical
                          style={{ padding: '1.5rem', flex: 2 }}
                        >
                          <Link
                            href={`/${locale}/collection/${collection?.path}`}
                            className={styles.title}
                          >
                            {collection?.collectionName}
                          </Link>
                          <Typography.Text className={styles.date}>
                            {t('fields.date')}:{' '}
                            {dayjs(collection?.releaseDate).format(
                              'DD/MM/YYYY',
                            )}
                          </Typography.Text>
                        </Flex>

                        <Button
                          type="primary"
                          icon={<EyeOutlined />}
                          onClick={() => {
                            router.push(
                              `/${locale}/collection/${collection?.path}`,
                            );
                          }}
                        />
                      </Flex>
                    </Col>
                  ),
                )}
          </Row>
        </div>
      </div>
    </>
  );
};

export default Collection;
