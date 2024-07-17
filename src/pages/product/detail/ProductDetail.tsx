'use client';

import { useGetByPath } from '@/loaders/product.loader';
import { ProductProps } from '@/models/product';
import { ProductColorsProps } from '@/models/product-color';
import { ProductSizeProps } from '@/models/product-size';
import {
  Button,
  Col,
  Divider,
  Flex,
  notification,
  Row,
  Space,
  Tabs,
  TabsProps,
  Typography,
} from 'antd';
import { useRef, useState } from 'react';
import { Navigation, Zoom, FreeMode, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/effect-fade';
import 'swiper/css/effect-creative';
import styles from './ProductDetail.module.scss';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/utils/responsive';
import { RiShoppingCartLine } from 'react-icons/ri';
import {
  useCreateCartDetail,
  useGetByVariant,
} from '@/loaders/cart-detail.loader';
import { useGetMe } from '@/loaders/auth.loader';
import { queryClient } from '@/lib/react-query';
import { CACHE_CART } from '@/loaders/cart.loader';

interface Props {
  path: string;
}

const ProductDetail = ({ path }: Props) => {
  const t = useTranslations('product');
  const tablet = useMediaQuery(`(max-width: 992px)`);
  const currentUser = useGetMe({});

  const swiperRef = useRef<any>(null);

  const [tab, setTab] = useState<string | number>('1');
  const [thumbsSwiper, setThumbsSwiper] = useState<any>();

  const [variant, setVariant] = useState<any>();
  const [product, setProduct] = useState<ProductProps>();
  const [color, setColor] = useState<ProductColorsProps>();
  const [size, setSize] = useState<ProductSizeProps | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  const productDetail = useGetByPath({
    params: {
      path: path,
    },
    config: {
      onSuccess: (response) => {
        setProduct(response);
        setColor(response?.colors?.[0]);
        setSize(response?.colors?.[0]?.sizes[0]);
      },
    },
    enabled: !!path,
  });

  const getByVariant = useGetByVariant({
    params: {
      customer: currentUser?.data?.customer?._id,
      product: product?._id,
      color: color?._id,
      size: size?._id,
    },
    config: {
      onSuccess: (response) => {
        setVariant(response);
      },
    },
  });

  const createCartDetail = useCreateCartDetail({
    config: {
      onSuccess: (_) => {
        // if (!variant) setCartNumber(cartNumber + 1);
        queryClient.invalidateQueries([CACHE_CART.SEARCH])
        notification.success({ message: 'Đã thêm vào giỏ hàng' });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
  });

  const handleQuantityPicker = (e: any, action: number) => {
    if (!e && action == -1 && quantity > 1) setQuantity(Number(quantity) - 1);
    if (!e && action == 1) {
      if (!variant) {
        if (size?.quantity && quantity < size?.quantity) {
          setQuantity(Number(quantity) + 1);
        } else {
          notification.error({
            message: `Chọn tối đa ${size?.quantity} sản phẩm`,
          });
        }
      }

      if (variant) {
        if (size?.quantity && quantity < size?.quantity - variant.quantity) {
          setQuantity(Number(quantity) + 1);
        } else {
          notification.error({
            message: `Trong giỏ đã có ${variant.quantity} sản phẩm, chọn tối đa ${
              size?.quantity && size?.quantity - variant.quantity
            } sản phẩm`,
          });
        }
      }
    }

    if (e && action == 0) {
      if (!variant) {
        if (size?.quantity && Number(e.target.value) > size?.quantity) {
          setQuantity(size?.quantity);
          notification.error({
            message: `Chọn tối đa ${size.quantity} sản phẩm`,
          });
        } else {
          setQuantity(Number(e.target.value) == 0 ? 1 : e.target.value);
        }
      }

      if (variant) {
        if (
          size?.quantity &&
          Number(e.target.value) > size.quantity - variant.quantity
        ) {
          const qty = size.quantity - variant.quantity;
          setQuantity(qty == 0 ? 1 : qty);
          notification.error({
            message: `Trong giỏ đã có ${variant.quantity} sản phẩm, chọn tối đa ${
              size.quantity - variant.quantity
            } sản phẩm`,
          });
        } else {
          setQuantity(Number(e.target.value) == 0 ? 1 : e.target.value);
        }
      }
    }
  };

  const addToCart = () => {
    if (size?.quantity == 0) {
      notification.error({ message: `Sản phẩm đã hết hàng` });
      return;
    }

    if (!variant && size && quantity > size?.quantity) {
      notification.error({ message: `Chọn tối đa ${size?.quantity} sản phẩm` });
      return;
    }

    if (variant && size && quantity > size.quantity - variant.quantity) {
      notification.error({
        message: `Trong giỏ đã có ${variant.quantity} sản phẩm, chọn tối đa ${
          size.quantity - variant.quantity
        } sản phẩm`,
      });
      return;
    }

    if (currentUser?.data?.customer) {
      createCartDetail?.mutate({
        customer: currentUser?.data?.customer?._id,
        product: product?._id,
        color: color?._id,
        size: size?._id,
        quantity: quantity,
      });
    } else {
      notification.error({
        message: 'Đăng nhập để thêm sản phẩm vào giỏ hàng',
      });
    }
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: t('label.description'),
    },
    {
      key: '2',
      label: t('label.size_chart'),
    },
  ];

  return (
    <>
      <div className="pt-3">
        <div className="layout-client">
          <Row gutter={[24, 24]}>
            <Col span={24} md={10} lg={14}>
              <Row gutter={[24, 24]}>
                <Col span={24} md={24} lg={5} order={tablet ? 2 : 1}>
                  <div className={styles.thumbContainer}>
                    <Swiper
                      ref={swiperRef}
                      onSwiper={setThumbsSwiper}
                      allowTouchMove={false}
                      spaceBetween={10}
                      freeMode={true}
                      watchSlidesProgress={true}
                      modules={[FreeMode, Navigation, Thumbs]}
                      breakpoints={{
                        0: {
                          slidesPerView: 5,
                          direction: 'horizontal',
                        },
                        576: {
                          slidesPerView: 5,
                          direction: 'horizontal',
                        },
                        768: {
                          slidesPerView: 5,
                          direction: 'horizontal',
                        },
                        992: {
                          slidesPerView: 5,
                          direction: 'vertical',
                        },
                        // 1024: {
                        //     slidesPerView: 5,
                        //     direction: 'vertical',
                        // },
                      }}
                    >
                      {color?.images?.map((image, index) => (
                        <SwiperSlide
                          onClick={() => {
                            if (swiperRef?.current) {
                              swiperRef?.current?.swiper?.slideTo(index - 1);
                            }
                          }}
                          key={index}
                        >
                          <img src={image.picture} className={styles.thumb} />
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  </div>
                </Col>
                <Col span={24} md={24} lg={19} order={tablet ? 1 : 2}>
                  <div className={styles.pictureContainer}>
                    <Swiper
                      zoom={true}
                      spaceBetween={10}
                      navigation={true}
                      thumbs={{
                        swiper:
                          thumbsSwiper && !thumbsSwiper?.destroyed
                            ? thumbsSwiper
                            : null,
                      }}
                      modules={[Zoom, FreeMode, Navigation, Thumbs]}
                      className="mySwiper2"
                    >
                      {color?.images?.map((image, index) => (
                        <SwiperSlide key={index}>
                          <div className="swiper-zoom-container">
                            <img
                              src={image.picture}
                              className={styles.picture}
                            />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                    {color?.discount && (
                      <div className={styles.discount}>
                        SALE
                        {' ' +
                          color.discount.value +
                          (color.discount.symbol == 1 ? '%' : 'K')}
                      </div>
                    )}
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24} md={14} lg={10}>
              <div className={styles.contentContainer}>
                <div className={styles.header}>
                  <Typography.Title className={styles.name}>
                    {product?.productName}
                  </Typography.Title>
                  <Flex align="center" justify="start">
                    <Typography.Title className={styles.price}>
                      {color?.discount
                        ? color?.discount.symbol == 1
                          ? Math.round(
                              Number(color?.price) *
                                ((100 - Number(color?.discount.value)) / 100),
                            ).toLocaleString()
                          : Math.round(
                              Number(color?.price) -
                                Number(color?.discount.value),
                            ).toLocaleString()
                        : color?.price?.toLocaleString()}{' '}
                      VND
                    </Typography.Title>
                    {color?.discount && (
                      <Typography.Title
                        className={styles.price}
                        style={{
                          textDecoration: 'line-through',
                          color: 'grey',
                          marginLeft: 20,
                        }}
                      >
                        {color?.price?.toLocaleString()}
                        VND
                      </Typography.Title>
                    )}
                  </Flex>
                </div>

                <div className={styles.info}>
                  <Typography.Title>
                    {t('label.origin')}: {product?.origin}
                  </Typography.Title>
                  <Typography.Title>
                    {t('label.material')}: {product?.material}
                  </Typography.Title>
                  <Typography.Title>
                    {t('label.style')}: {product?.style}
                  </Typography.Title>
                </div>

                <div className={styles.variantContainer}>
                  <Flex align="center">
                    <Typography.Text className={styles.label}>
                      {t('label.color')}:
                    </Typography.Text>
                    <Space size={16}>
                      {product?.colors?.map((item, index) => (
                        <Typography.Link
                          className={styles.box}
                          key={index}
                          style={{
                            borderColor:
                              color?._id == item?._id ? '#e8554e' : item.hex,
                          }}
                          onClick={() => {
                            setColor(item);
                            setSize(item?.sizes?.[0]);
                            setQuantity(1);
                          }}
                        >
                          <span
                            className={styles.boxItem}
                            style={{ backgroundColor: item.hex }}
                          ></span>
                        </Typography.Link>
                      ))}
                    </Space>
                  </Flex>
                  <Flex align="center">
                    <Typography.Text className={styles.label}>
                      {t('label.size')}:
                    </Typography.Text>
                    <Space size={16}>
                      {color &&
                        color?.sizes?.map((item, index) => (
                          <Typography.Link
                            className={styles.box}
                            key={index}
                            style={{
                              borderColor:
                                size?._id == item?._id ? '#e8554e' : '#656973',
                            }}
                            onClick={() => {
                              setSize(item);
                              setQuantity(1);
                            }}
                          >
                            <span className={styles.boxItem}>
                              {item?.sizeName}
                            </span>
                          </Typography.Link>
                        ))}
                    </Space>
                  </Flex>
                  <Flex align="center">
                    <Typography.Text className={styles.label}>
                      {t('label.status')}:
                    </Typography.Text>
                    <Space size={16}>
                      <Typography.Text
                        style={{
                          color: size && size?.quantity > 0 ? 'black' : 'red',
                        }}
                      >
                        {size &&
                          (size?.quantity > 0
                            ? `${t('label.stock')} ` +
                              size?.quantity +
                              ` ${t('label.product')}`
                            : t('sold'))}
                      </Typography.Text>
                    </Space>
                  </Flex>
                  <Divider />
                  <Flex align="center" justify="space-between">
                    <div className={styles.quantity}>
                      <Typography.Link
                        className={styles.minus}
                        onClick={() => handleQuantityPicker(null, -1)}
                      >
                        -
                      </Typography.Link>
                      <input
                        type="number"
                        value={quantity}
                        onChange={(e) => handleQuantityPicker(e, 0)}
                      />
                      <Typography.Link
                        className={styles.plus}
                        onClick={() => handleQuantityPicker(null, 1)}
                      >
                        +
                      </Typography.Link>
                    </div>
                    <Button
                      icon={<RiShoppingCartLine />}
                      type="primary"
                      style={{ display: 'flex', alignItems: 'center' }}
                      onClick={addToCart}
                      loading={createCartDetail?.isLoading}
                    >
                      {t('label.add_to_cart')}
                    </Button>
                  </Flex>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.bottom}>
          <div className="layout-client">
            <Tabs items={items} onChange={(e) => setTab(e)} />
            {Number(tab) == 1 ? (
              !product?.description ? (
                '(Chưa cập nhật mô tả, vui lòng chờ hoặc liên hệ với shop qua các nền tảng socials)'
              ) : (
                <div
                  className=""
                  dangerouslySetInnerHTML={{
                    __html: product?.description || '',
                  }}
                ></div>
              )
            ) : !product?.sizeGuide ? (
              '(Chưa cập nhật bảng size, vui lòng chờ hoặc liên hệ với shop qua các nền tảng socials)'
            ) : (
              <div>
                <img src={product?.sizeGuide} className={styles.sizeChart} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
