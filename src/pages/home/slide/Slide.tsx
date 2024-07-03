'use client';

import styles from './Slide.module.scss';
import { Flex, Typography, Image } from 'antd';
import { useTranslations } from 'next-intl';
import { FaFire } from 'react-icons/fa6';
import ButtonMain from '@/pages/shared/buttons/button-main/ButtonMain';
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
import { useSearchSlides } from '@/loaders/slide.loader';
import { MAX_PAGE_SIZE, MIN_PAGE_SIZE } from '@/constants/config';
import { SlideProps } from '@/models/slide';

const Slide = () => {
  const t = useTranslations();

  const searchSlides = useSearchSlides({
    params: {
      pageIndex: MIN_PAGE_SIZE,
      pageSize: MAX_PAGE_SIZE,
      searchData: '',
    },
  });

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
          {searchSlides?.data?.slides?.map((slide: SlideProps) => (
            <SwiperSlide key={slide?._id}>
              <div className={`${styles.slide} ${styles.overlay}`}>
                <Image
                  className={styles.image}
                  src={slide?.picture}
                  alt="Slide"
                  preview={false}
                />
                <div className={styles.content}>
                  <Flex
                    justify="center"
                    align="center"
                    className={styles.prefix}
                  >
                    <FaFire />
                    <Typography.Text>{t('global.app')}</Typography.Text>
                  </Flex>
                  <Typography.Title className={styles.title}>
                    {slide?.slideName || t('slide.slide_name')}
                  </Typography.Title>
                  <Flex justify="center" align="center" vertical>
                    <p
                      className={styles.description}
                      dangerouslySetInnerHTML={{
                        __html: `<p>Lorem ipsum dolor sit amet consectetur adipisicing!</p>`,
                      }}
                    ></p>
                    <ButtonMain />
                  </Flex>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </>
  );
};

export default Slide;
