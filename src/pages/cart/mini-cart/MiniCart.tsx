import { useLocale, useTranslations } from 'next-intl';
import styles from './MiniCart.module.scss';
import { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Divider,
  Drawer,
  Flex,
  Modal,
  notification,
  Row,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { RiShoppingCartLine } from 'react-icons/ri';
import { IoClose } from 'react-icons/io5';
import { ExclamationCircleFilled, LoadingOutlined } from '@ant-design/icons';
import Link from 'next/link';
import { useGetMe } from '@/loaders/auth.loader';
import { CACHE_CART, useSearchCarts } from '@/loaders/cart.loader';
import { CartDetailProps } from '@/models/cart-detail';
import { ProductColorsProps } from '@/models/product-color';
import { ProductProps } from '@/models/product';
import { CART_PATH, PAYMENT_PATH, PRODUCT_PATH } from '@/paths';
import { ProductSizeProps } from '@/models/product-size';
import {
  useRemoveCartDetail,
  useUpdateCartDetail,
} from '@/loaders/cart-detail.loader';
import { queryClient } from '@/lib/react-query';
import { useRouter } from 'next/navigation';

const { confirm } = Modal;
const { useToken } = theme;

const MiniCart = () => {
  const t = useTranslations('cart');
  const [open, setOpen] = useState(false);
  const currentUser = useGetMe({});
  const { token } = useToken();
  const locale = useLocale();
  const router = useRouter();

  const searchCarts = useSearchCarts({
    params: {
      customer: currentUser?.data?.customer?._id,
    },
    // enabled: !currentUser?.isLoading && open,
  });

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleDelete = (id?: string) => {
    confirm({
      title: t('confirm_delete_title'),
      icon: <ExclamationCircleFilled />,
      content: t('confirm_delete'),
      onOk: () => {
        deleteCartDetail.mutate(id || '');
      },
      okText: t('ok'),
      cancelText: t('cancel'),
    });
  };

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

  return (  
    <>
      <Tooltip title={t('title')}>
        <div className={styles.cart}>
          <Button
            shape="circle"
            icon={<RiShoppingCartLine />}
            className={styles.btnCart}
            onClick={showDrawer}
          />
          <Flex justify="center" align="center" className={styles.quantity}>
            {(searchCarts?.isLoading || searchCarts?.isFetching || currentUser?.isLoading) ? (
              <LoadingOutlined />
            ) : (
              searchCarts?.data?.cartDetails?.length || 0
            )}
          </Flex>
        </div>
      </Tooltip>
      <Drawer title={t('title')} onClose={onClose} open={open} width={500}>
        {searchCarts?.isLoading ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <div
              className="loader"
              style={{ background: token.colorPrimary }}
            ></div>
          </Flex>
        ) : (
          <div className={styles.container}>
            <div className={styles.main}>
              {searchCarts?.data?.cartDetails.map(
                (item: CartDetailProps, index: number) => (
                  <div className={styles.item} key={index}>
                    <Flex align="center" justify="space-between">
                      <Flex align="center">
                        <div>
                          <img
                            className={styles.image}
                            src={
                              (item?.color as ProductColorsProps)?.images?.[0]
                                ?.picture
                            }
                            alt="CartPicture"
                          />
                        </div>
                        <Typography.Link
                          className={styles.btnRemove}
                          onClick={() => handleDelete(item?._id)}
                        >
                          <IoClose />
                        </Typography.Link>
                        <Flex
                          justify="center"
                          vertical
                          className={styles.content}
                        >
                          <Link
                            href={`/${locale}/${PRODUCT_PATH}/${(item?.product as ProductProps)?.path}`}
                          >
                            {(item?.product as ProductProps)?.productName}
                          </Link>
                          <Typography.Title>
                            {(item?.color as ProductColorsProps)?.colorName}/
                            {(item?.size as ProductSizeProps)?.sizeName}/x
                            {item.quantity}/
                            {(item?.color as ProductColorsProps)?.discount
                              ? (item?.color as ProductColorsProps)?.discount
                                  ?.symbol == 1
                                ? Math.round(
                                    Number(
                                      (item?.color as ProductColorsProps)
                                        ?.price,
                                    ) *
                                      ((100 -
                                        Number(
                                          (item?.color as ProductColorsProps)
                                            ?.discount.value,
                                        )) /
                                        100),
                                  ).toLocaleString()
                                : Math.round(
                                    Number(
                                      (item?.color as ProductColorsProps)
                                        ?.price,
                                    ) -
                                      Number(
                                        (item?.color as ProductColorsProps)
                                          ?.discount.value,
                                      ),
                                  ).toLocaleString()
                              : (
                                  item?.color as ProductColorsProps
                                )?.price?.toLocaleString()}
                          </Typography.Title>
                        </Flex>
                      </Flex>
                      {updatedRecord?._id == item?._id &&
                      (updateCartDetail?.isLoading || loadingUpdated) ? (
                        <LoadingOutlined style={{ margin: '0 .5rem' }} />
                      ) : (
                        <Checkbox
                          checked={item?.active == 1}
                          onChange={(e) => handleChangeCheck(e, item)}
                          className="btn-checkbox"
                        />
                      )}
                    </Flex>
                  </div>
                ),
              )}
            </div>
            <Divider />
            <Row gutter={[12, 12]} className={styles.footer}>
              <Col span={12} md={12} lg={12}>
                <Button
                  style={{ width: '100%', background: 'black', color: 'white' }}
                  onClick={() => {
                    router?.push(`/${locale}/${CART_PATH}`);
                  }}
                  className={styles.gotoCart}
                >
                  {t('view_cart')}
                </Button>
              </Col>
              <Col span={12} md={12} lg={12}>
                <Button type="primary" style={{ width: '100%' }}
                onClick={() => {
                  router?.push(`/${locale}/${PAYMENT_PATH}`);
                }}>
                  {t('payment')}
                </Button>
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default MiniCart;
