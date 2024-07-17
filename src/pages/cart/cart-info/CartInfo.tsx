'use client';

import TableRender from '@/pages/shared/table-render/TableRender';
import styles from './CartInfo.module.scss';
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  notification,
  Row,
  Space,
  TableColumnsType,
  Tooltip,
  Typography,
} from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { CartDetailProps } from '@/models/cart-detail';
import ConfirmRender from '@/pages/shared/modal/confirm/ConfirmRender';
import { DeleteOutlined, LoadingOutlined } from '@ant-design/icons';
import { queryClient } from '@/lib/react-query';
import { CACHE_CART, useSearchCarts } from '@/loaders/cart.loader';
import {
  useRemoveCartDetail,
  useUpdateCartDetail,
} from '@/loaders/cart-detail.loader';
import { useGetMe } from '@/loaders/auth.loader';
import { ProductColorsProps } from '@/models/product-color';
import { ProductProps } from '@/models/product';
import Link from 'next/link';
import { ProductSizeProps } from '@/models/product-size';
import { PAYMENT_PATH, PRODUCT_PATH } from '@/paths';
import CartInfoModal from './update/CartInfoModal';
import { FaRegStickyNote } from 'react-icons/fa';
import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';

const CartInfo = () => {
  const t = useTranslations('cart');
  const locale = useLocale();
  const currentUser = useGetMe({});
  const router = useRouter();

  const searchCarts = useSearchCarts({
    params: {
      customer: currentUser?.data?.customer?._id,
    },
    enabled: !currentUser?.isLoading,
  });

  const [updatedRecord, setUpdatedRecord] = useState<CartDetailProps>();
  const [loadingUpdated, setLoadingUpdated] = useState<boolean>();
  const updateCartDetail = useUpdateCartDetail({
    id: updatedRecord?._id || '',
    config: {
      onSuccess: (response) => {
        queryClient.invalidateQueries([CACHE_CART.SEARCH]);
        setTimeout(() => {
          setLoadingUpdated(false);
        }, 500);

        notification.success({
          message:
            response?.active == 1 ? t('buying_success') : t('buying_failure'),
        });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
  });

  const totalPrice = useMemo(() => {
    if (
      !searchCarts?.isLoading &&
      !updateCartDetail?.isLoading &&
      !searchCarts?.isFetching
    ) {
      let result = 0;
      searchCarts?.data?.cartDetails.forEach((item: any) => {
        if (item?.active == 1) {
          if (item?.color?.discount) {
            if (item?.color?.discount?.symbol == 1) {
              result +=
                Math.round(
                  Number(item?.color?.price) *
                    ((100 - Number(item?.color?.discount?.value)) / 100),
                ) * item?.quantity;
            } else {
              result +=
                Math.round(
                  Number(item?.color?.price) -
                    Number(item?.color?.discount?.value),
                ) * item?.quantity;
            }
          } else {
            result += item?.color?.price * item?.quantity;
          }
        }
      });
      return result;
    }
  }, [
    updateCartDetail?.isLoading,
    searchCarts?.isLoading,
    searchCarts?.isFetching,
  ]);

  const totalItems = useMemo(() => {
    if (
      !searchCarts?.isLoading &&
      !updateCartDetail?.isLoading &&
      !searchCarts?.isFetching
    ) {
      return searchCarts?.data?.cartDetails?.filter(
        (item: CartDetailProps) => item?.active == 1,
      ).length;
    }
  }, [
    updateCartDetail?.isLoading,
    searchCarts?.isLoading,
    searchCarts?.isFetching,
  ]);

  const deleteCartDetail = useRemoveCartDetail({
    config: {
      onSuccess: () => {
        queryClient.invalidateQueries([CACHE_CART.SEARCH]);

        notification.success({
          message: t('delete_success'),
        });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
  });

  const handleChangeCheck = (e: any, record: any) => {
    setUpdatedRecord(record);

    setLoadingUpdated(true);
    setTimeout(() => {
      updateCartDetail?.mutate({
        ...record,
        active: e?.target?.checked ? '1' : '2',
      });
    }, 300);
  };

  const CART_DETAILS_COLUMNS: TableColumnsType<CartDetailProps> = [
    {
      width: 40,
      align: 'center',
      render: (_, record: any) => (
        <>
          {updatedRecord?._id == record?._id &&
          (updateCartDetail?.isLoading || loadingUpdated) ? (
            <LoadingOutlined />
          ) : (
            <Checkbox
              checked={record?.active == 1}
              onChange={(e) => handleChangeCheck(e, record)}
            />
          )}
        </>
      ),
    },
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
    {
      title: t('action'),
      width: 150,
      align: 'right',
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <Space>
              {/* <EditDeliveryAddressModal id={record?._id} /> */}
              <CartInfoModal
                record={record}
                cartDetails={searchCarts?.data?.cartDetails}
              />
              <ConfirmRender
                buttonRender={
                  <Tooltip title={t('delete')}>
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      className="btn-delete"
                    />
                  </Tooltip>
                }
                handleConfirm={() => handleDelete(record?._id)}
                content={t('confirm_delete')}
                title={t('confirm_delete_title')}
              />
            </Space>
          </>
        );
      },
    },
    // Table.SELECTION_COLUMN,
  ];

  const handleDelete = (id?: string) => {
    deleteCartDetail.mutate(id || '');
  };

  return (
    <>
      <div className="layout-client">
        <Row gutter={[24, 24]}>
          <Col span={24} md={16} lg={16}>
            <div className={styles.table}>
              <TableRender
                loading={searchCarts?.isLoading || currentUser?.isLoading}
                columns={CART_DETAILS_COLUMNS}
                data={searchCarts?.data?.cartDetails}
                pagination={false}
                bordered={false}
                // isCheckBox
              />
              <Typography.Title>
                <Flex align="center">
                  <FaRegStickyNote style={{ marginRight: 6 }} />
                  {t('note')}
                </Flex>
              </Typography.Title>
            </div>
          </Col>
          <Col span={24} md={8} lg={8}>
            <Card title={t('title')} className={styles.card}>
              <Flex
                align="center"
                justify="space-between"
                className={styles.cardItem}
              >
                <Typography.Title>{t('buying')}</Typography.Title>
                <Typography.Title>
                  {currentUser?.isLoading ||
                  searchCarts?.isLoading ||
                  searchCarts?.isFetching ||
                  updateCartDetail?.isLoading ? (
                    <LoadingOutlined />
                  ) : (
                    totalItems || 0
                  )}{' '}
                  {t('product')}
                </Typography.Title>
              </Flex>
              <Flex
                align="center"
                justify="space-between"
                className={styles.cardItem}
              >
                <Typography.Title>{t('total')}</Typography.Title>
                <Typography.Title>
                  {currentUser?.isLoading ||
                  searchCarts?.isLoading ||
                  searchCarts?.isFetching ||
                  updateCartDetail?.isLoading ? (
                    <LoadingOutlined />
                  ) : totalPrice ? (
                    totalPrice.toLocaleString()
                  ) : (
                    0
                  )} VND
                </Typography.Title> 
              </Flex>
              <Divider />
              <Button type="primary" style={{ width: '100%' }} onClick={() => {
                router?.push(`/${locale}/${PAYMENT_PATH}`)
              }}>
                {t('payment')}
              </Button>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default CartInfo;
