import { useGetMe } from '@/loaders/auth.loader';
import { useSearchCarts } from '@/loaders/cart.loader';
import { CartDetailProps } from '@/models/cart-detail';
import { ProductProps } from '@/models/product';
import { ProductColorsProps } from '@/models/product-color';
import { ProductSizeProps } from '@/models/product-size';
import { PRODUCT_PATH } from '@/paths';
import { Flex, TableColumnsType, Typography } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './ProductBuy.module.scss';
import TableRender from '@/components/shared/table-render/TableRender';

const ProductBuy = () => {
  const t = useTranslations('cart');
  const currentUser = useGetMe({});
  const locale = useLocale();

  const searchCarts = useSearchCarts({
    params: {
      customer: currentUser?.data?.customer?._id,
    },
    enabled: !currentUser?.isLoading,
  });

  const CART_DETAILS_COLUMNS: TableColumnsType<CartDetailProps> = [
    {
      width: 150,
      align: 'center',
      render: (_, record: any) => (
        <>
          <div>
            <img
              src={(record?.color as ProductColorsProps)?.images?.[0]?.picture}
              alt="CartPicture"
              className={styles.image}
            />
          </div>
        </>
      ),
    },
    {
      title: t('product'),
      render: (_, record: any) => {
        return (
          <Flex justify={'center'} vertical className={styles.content}>
            <Link
              href={`/${locale}/${PRODUCT_PATH}/${(record?.product as ProductProps)?.path}`}
            >
              {(record?.product as ProductProps)?.productName}
            </Link>
            <Typography.Title>
              {(record?.color as ProductColorsProps)?.colorName}/
              {(record?.size as ProductSizeProps)?.sizeName}/x
              {record.quantity}/
              {(record?.color as ProductColorsProps)?.discount
                ? (record?.color as ProductColorsProps)?.discount?.symbol == 1
                  ? Math.round(
                      Number((record?.color as ProductColorsProps)?.price) *
                        ((100 -
                          Number(
                            (record?.color as ProductColorsProps)?.discount
                              .value,
                          )) /
                          100),
                    ).toLocaleString()
                  : Math.round(
                      Number((record?.color as ProductColorsProps)?.price) -
                        Number(
                          (record?.color as ProductColorsProps)?.discount.value,
                        ),
                    ).toLocaleString()
                : (
                    record?.color as ProductColorsProps
                  )?.price?.toLocaleString()}
            </Typography.Title>
          </Flex>
        );
      },
    },
    {
      title: t('total'),
      width: 150,
      align: 'center',
      render: (_, record: CartDetailProps) => {
        return (
          <>
            {(record?.color as ProductColorsProps)?.discount
              ? (record?.color as ProductColorsProps)?.discount?.symbol == 1
                ? (
                    Math.round(
                      Number((record?.color as ProductColorsProps)?.price) *
                        ((100 -
                          Number(
                            (record?.color as ProductColorsProps)?.discount
                              ?.value,
                          )) /
                          100),
                    ) * (record?.quantity || 1)
                  )?.toLocaleString()
                : (
                    Math.round(
                      Number((record?.color as ProductColorsProps)?.price) -
                        Number(
                          (record?.color as ProductColorsProps)?.discount
                            ?.value,
                        ),
                    ) * (record?.quantity || 1)
                  ).toLocaleString()
              : (
                  ((record?.color as ProductColorsProps)?.price || 1) *
                  (record?.quantity || 1)
                )?.toLocaleString()}
          </>
        );
      },
    },
    // Table.SELECTION_COLUMN,
  ];
  return (
    <>
      <div style={{ padding: '3rem 0 5rem 0' }}>
        <TableRender
          loading={searchCarts?.isLoading || currentUser?.isLoading}
          columns={CART_DETAILS_COLUMNS}
          data={searchCarts?.data?.cartDetails?.filter(
            (c: CartDetailProps) => c?.active == 1,
          )}
          pagination={false}
          bordered={false}
          // isCheckBox
        />
      </div>
    </>
  );
};

export default ProductBuy;
