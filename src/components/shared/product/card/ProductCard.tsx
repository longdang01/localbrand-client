'use client';

import Link from 'next/link';
import styles from './ProductCard.module.scss';
import { useLocale, useTranslations } from 'next-intl';
import { Button, Flex, Typography } from 'antd';
import { ProductProps } from '@/models/product';
import logo from '@/assets/images/logo/logo2.jpg';
import { useRouter } from 'next/navigation';
import { PRODUCT_PATH } from '@/paths';

interface Props {
  product: ProductProps;
}

const ProductCard = ({ product }: Props) => {
  const t = useTranslations('product');
  const locale = useLocale();
  const router = useRouter();

  const handleChangeImage = (e: any, color: any) => {
    const pictureElm = e?.target.closest('.thumb').querySelector('.picture');
    pictureElm.src = color?.images?.[0]?.picture || logo?.src;
  };

  return (
    <>
      <div className={styles.card}>
        <div className={`${styles.thumb} thumb`}>
          <Link href={`/${locale}/${PRODUCT_PATH}/${product?.path}`}>
            <div
              style={{
                overflow: 'hidden',
                border: '2px solid #e1e1e1',
                borderRadius: 10,
                height: 350,
              }}
            >
              <img
                src={product?.colors?.[0]?.images?.[0]?.picture || logo?.src}
                alt="Product Image"
                className="picture"
              />
            </div>
          </Link>
          {product?.colors?.find((color: any) => color?.discount) && (
            <div className={styles.tag}>SALE</div>
          )}

          <div className={styles.variants}>
            <Flex vertical>
              {product.colors.map((color: any, index) => (
                <div
                  className={styles.color}
                  style={{ backgroundColor: color.hex }}
                  key={index}
                  onMouseEnter={(e) => {
                    handleChangeImage(e, color);
                  }}
                >
                  <Typography.Text
                    style={{
                      visibility: color?.discount ? 'visible' : 'hidden',
                      color:
                        color?.colorName?.toLowerCase() == 'màu trắng'
                          ? 'black'
                          : 'white',
                    }}
                  >
                    SALE
                  </Typography.Text>
                </div>
              ))}
            </Flex>
          </div>

          <Button
            className={`btn-dark ${styles.btnBuy}`}
            onClick={() => {
              router.push(`/${locale}/${PRODUCT_PATH}/${product?.path}`);
            }}
          >
            {t('buy')}
          </Button>
        </div>

        <div className={`${styles.content}`}>
          <div className="inner">
            <h5 className={`${styles.title}`}>
              <Link
                href={`/${locale}/${PRODUCT_PATH}/${product?.path}`}
                className="cursor-pointer"
              >
                {product.productName}
              </Link>
            </h5>
            <div className={`${styles.priceRange}`}>
              <span className={`${styles.price} ${styles.currentPrice} italic`}>
                {Math.min(
                  ...product.colors.map((color: any) =>
                    color.discount
                      ? color.discount.symbol == 2
                        ? Math.round(
                            Number(color.price) - Number(color.discount.value),
                          )
                        : Math.round(
                            Number(color.price) *
                              ((100 - Number(color.discount.value)) / 100),
                          )
                      : color.price,
                  ),
                ) ==
                Math.max(
                  ...product.colors.map((color: any) =>
                    color.discount
                      ? color.discount.symbol == 2
                        ? Math.round(
                            Number(color.price) - Number(color.discount.value),
                          )
                        : Math.round(
                            Number(color.price) *
                              ((100 - Number(color.discount.value)) / 100),
                          )
                      : color.price,
                  ),
                )
                  ? Math.max(
                      ...product.colors.map((color: any) =>
                        color.discount
                          ? color.discount.symbol == 2
                            ? Math.round(
                                Number(color.price) -
                                  Number(color.discount.value),
                              )
                            : Math.round(
                                Number(color.price) *
                                  ((100 - Number(color.discount.value)) / 100),
                              )
                          : color.price,
                      ),
                    ).toLocaleString()
                  : Math.min(
                      ...product.colors.map((color: any) =>
                        color.discount
                          ? color.discount.symbol == 2
                            ? Math.round(
                                Number(color.price) -
                                  Number(color.discount.value),
                              )
                            : Math.round(
                                Number(color.price) *
                                  ((100 - Number(color.discount.value)) / 100),
                              )
                          : color.price,
                      ),
                    ).toLocaleString() +
                    ' - ' +
                    Math.max(
                      ...product.colors.map((color: any) =>
                        color.discount
                          ? color.discount.symbol == 2
                            ? Math.round(
                                Number(color.price) -
                                  Number(color.discount.value),
                              )
                            : Math.round(
                                Number(color.price) *
                                  ((100 - Number(color.discount.value)) / 100),
                              )
                          : color.price,
                      ),
                    ).toLocaleString()}{' '}
                VND
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
