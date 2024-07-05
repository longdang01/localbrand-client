'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCreative,
  EffectFade,
} from 'swiper/modules';
import { useGetByPath } from '@/loaders/collection.loader';
import { Button, Divider, Flex, Typography, Image } from 'antd';
import styles from './CollectionDetail.module.scss';
import { IoImageOutline } from 'react-icons/io5';
import dayjs from 'dayjs';
import { LookbookProps } from '@/models/lookbook';

interface Props {
  path?: string;
}

const CollectionDetail = ({ path }: Props) => {
  const collectionDetail = useGetByPath({
    params: {
      path: path,
    },
    enabled: !!path,
  });

  return (
    <>
      <div className="layout-client">
        <div>
          <Flex justify="center" align="center" style={{ padding: '3rem 0' }}>
            <div style={{ textAlign: 'center' }}>
              <Typography.Title className={styles.title}>
                {collectionDetail?.data?.[0]?.collectionInfo?.collectionName}
              </Typography.Title>
              <Typography.Text className={styles.date}>
                {collectionDetail?.data?.[0]?.collectionInfo.releaseDate &&
                  dayjs(
                    collectionDetail?.data?.[0]?.collectionInfo?.releaseDate,
                  )?.format('DD/MM/YYYY')}
              </Typography.Text>
            </div>
          </Flex>

          {collectionDetail?.data?.map((look: LookbookProps, index: number) => (
            <div className={styles.look} key={index}>
              <Flex align="center">
                <Button
                  type="primary"
                  icon={<IoImageOutline />}
                  shape="circle"
                  style={{ cursor: 'default', marginRight: 10 }}
                  onClick={undefined}
                />
                <Typography.Text>{look?.lookbookName}</Typography.Text>
              </Flex>

              <div
                dangerouslySetInnerHTML={{
                  __html: look?.description || '',
                }}
                style={{ fontWeight: 'bold' }}
              ></div>
              <Divider />

              <Swiper
                modules={[
                  Navigation,
                  Pagination,
                  Scrollbar,
                  A11y,
                  Autoplay,
                  EffectCreative,
                  EffectFade,
                ]}
                spaceBetween={50}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                allowTouchMove={false}
                speed={1200}
                effect={'fade'}
                className={styles.swiper}
              >
                <SwiperSlide>
                  <div className={`${styles.slide}`}>
                    <Image
                      className={styles.image}
                      src={
                        'https://res.cloudinary.com/dgdhbwcga/image/upload/v1716361842/fragile/b4mpz7aokkxyeyfx9fu0.jpg'
                      }
                      alt="Slide"
                      preview={false}
                    />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className={`${styles.slide}`}>
                    <Image
                      className={styles.image}
                      src={
                        'https://res.cloudinary.com/dgdhbwcga/image/upload/v1683452608/fragile/jpytejvgwd9zbtlgeifo.png'
                      }
                      alt="Slide"
                      preview={false}
                    />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CollectionDetail;
