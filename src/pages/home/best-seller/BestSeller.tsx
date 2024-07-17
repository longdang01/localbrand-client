'use client';

import styles from './BestSeller.module.scss';
import { Image, Typography } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
  EffectCreative,
  EffectFade,
} from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';
import { useGetBestSeller } from '@/loaders/product.loader';
import { ProductProps } from '@/models/product';
import Link from 'next/link';
import { PRODUCT_PATH } from '@/paths';

const BestSeller = () => {
  const t = useTranslations();
  const locale = useLocale();

  const searchBestSeller = useGetBestSeller({});

  return (
    <>
      <section className={styles.slideContainer}>
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
          {searchBestSeller?.data?.products?.map((item: ProductProps) => (
            <SwiperSlide key={item?._id}>
              <Link href={`/${locale}/${PRODUCT_PATH}/${item?.path}`} target="_blank" className={`${styles.slide} ${styles.overlay}`}>
                <Image
                  className={styles.image}
                  src={item?.colors?.[0]?.images?.[0]?.picture}
                  alt="Slide"
                  preview={false}
                />
                <div className={styles.content}>
                  {/* <Flex
                    justify="center"
                    align="center"
                    className={styles.prefix}
                  >
                    <FaFire />
                    <Typography.Text>{t('global.app')}</Typography.Text>
                  </Flex> */}
                  <Typography.Title className={styles.title}>
                    BEST SELLER
                  </Typography.Title>
                  {/* <Flex justify="center" align="center" vertical>
                    <p
                      className={styles.description}
                      dangerouslySetInnerHTML={{
                        __html: `<p>Lorem ipsum dolor sit amet consectetur adipisicing!</p>`,
                      }}
                    ></p>
                    <ButtonMain />
                  </Flex> */}
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default BestSeller;
