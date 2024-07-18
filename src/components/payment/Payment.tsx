'use client';

import { useEffect, useMemo, useState } from 'react';
import { Button, Flex, notification, Steps, Tooltip, Typography } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import DeliveryAddress from './steps/address/DeliveryAddress';
import { useSearchDeliveryAddress } from '@/loaders/delivery-address.loader';
import { useGetMe } from '@/loaders/auth.loader';
import { DeliveryAddressProps } from '@/models/delivery-address';
import { ImNotification } from 'react-icons/im';
import ProductBuy from './steps/product-buy/ProductBuy';
import { CACHE_CART, useSearchCarts } from '@/loaders/cart.loader';
import { CartDetailProps } from '@/models/cart-detail';
import OrderFinal from './steps/order-final/OrderFinal';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { STEP } from '@/constants/config';
import { useCreateClientOrder } from '@/loaders/order.loader';
import { queryClient } from '@/lib/react-query';
import { ACCOUNT_ORDER } from '@/paths';

const Payment = () => {
  const t = useTranslations('payment');
  const [current, setCurrent] = useState(0);
  const currentUser = useGetMe({});
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    const current = new URLSearchParams(searchParams?.toString());

    if (current?.get(STEP)) {
      setCurrent(Number(current?.get(STEP)));
    }
  }, [searchParams]);

  const searchAddress = useSearchDeliveryAddress({
    params: {
      pageIndex: 1,
      pageSize: 1000,
      searchData: '',
      customer: currentUser?.data?.customer?._id,
    },
    enabled: !currentUser?.isLoading,
  });

  const searchCarts = useSearchCarts({
    params: {
      customer: currentUser?.data?.customer?._id,
    },
    enabled: !currentUser?.isLoading,
  });

  const totalPrice = useMemo(() => {
    if (!searchCarts?.isLoading && !searchCarts?.isFetching) {
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
  }, [searchCarts?.isLoading, searchCarts?.isFetching]);

  const createOrder = useCreateClientOrder({
    config: {
      onSuccess: (_) => {
        setSubmitForm(false);

        queryClient.invalidateQueries([CACHE_CART.SEARCH]);

        notification.success({
          message: t('order_success'),
        });

        setTimeout(() => {
          router?.push(`/${locale}/${ACCOUNT_ORDER}`);
        }, 300);
      },
      onError: (error: any) => {
        setSubmitForm(false);

        notification.error({
          message: error?.response?.data?.message,
        });
      },
    },
  });

  const [submitForm, setSubmitForm] = useState<boolean>(false);
  const handleFormFinish = async (values: any) => {
    values.customer = currentUser?.data?.customer?._id;
    values.status = 2;
    values.transportFee = 0;
    values.paid = 2;
    values.total = totalPrice;
    values.details = searchCarts?.data?.cartDetails.filter(
      (item: any) => item.active == 1,
    );

    if (values.details?.length == 0) {
      notification.error({
        message:
          'Danh sách mua đang trống, vui lòng mua hàng trước khi thanh toán',
      });
      setSubmitForm(false);
      return;
    }

    createOrder?.mutate({ ...values });
  };

  const handleOrder = () => {
    setSubmitForm(true);
  };

  const steps = [
    {
      title: t('steps.1'),
      content: <DeliveryAddress />,
    },
    {
      title: t('steps.2'),
      content: <ProductBuy />,
    },
    {
      title: t('steps.3'),
      content: (
        <OrderFinal
          totalPrice={totalPrice}
          submitForm={submitForm}
          onFinish={handleFormFinish}
        />
      ),
    },
  ];

  const next = () => {
    const cur = new URLSearchParams(searchParams?.toString());
    setCurrent(current + 1);

    cur.set(STEP, String(current + 1));
    router.push(`${pathname}?${cur}`);
    router.refresh();
  };

  const prev = () => {
    const cur = new URLSearchParams(searchParams?.toString());
    setCurrent(current - 1);

    cur.set(STEP, String(current - 1));
    router.push(`${pathname}?${cur}`);
    router.refresh();
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const checkDisabled = () => {
    switch (current) {
      case 0:
        const checked = searchAddress?.data?.deliveryAddresses?.find(
          (address: DeliveryAddressProps) => address?.active == 1,
        );
        return checked ? [false] : [true, t('notification.address')];
      case 1:
        return searchCarts?.data?.cartDetails?.filter(
          (c: CartDetailProps) => c?.active == 1,
        )?.length != 0
          ? [false]
          : [true, t('notification.product_buy')];
    }
  };

  return (
    <>
      <div className="ptb-3">
        <div className="layout-client">
          <Steps current={current} items={items} />
          <div>{steps[current].content}</div>
          <div style={{ marginTop: 24 }}>
            <Flex align="center">
              <>
                <Flex
                  align="center"
                  justify="space-between"
                  style={{ width: '100%' }}
                >
                  <div>
                    {current < steps.length - 1 && (
                      <Tooltip
                        title={
                          !!checkDisabled()?.[0]
                            ? checkDisabled()?.[1]
                            : t('next')
                        }
                      >
                        <Button
                          type="primary"
                          onClick={() => next()}
                          disabled={!!checkDisabled()?.[0]}
                        >
                          {t('next')}
                        </Button>
                      </Tooltip>
                    )}

                    {current === steps.length - 1 && (
                      <Button
                        type="primary"
                        onClick={() => handleOrder()}
                        loading={createOrder?.isLoading}
                      >
                        {t('done')}
                      </Button>
                    )}

                    {current > 0 && (
                      <Button
                        style={{ margin: '0 8px' }}
                        onClick={() => prev()}
                      >
                        {t('previous')}
                      </Button>
                    )}
                  </div>

                  {!!checkDisabled()?.[0] && (
                    <Flex align="center" style={{ color: 'red' }}>
                      <ImNotification style={{ marginRight: 5 }} />
                      <Typography.Text style={{ color: 'red' }}>
                        {checkDisabled()?.[1]}
                      </Typography.Text>
                    </Flex>
                  )}
                </Flex>
              </>
            </Flex>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
