import { useDisclosure } from '@/utils/modal';
import {
  Button,
  Col,
  Divider,
  Flex,
  List,
  Row,
  Tooltip,
  Typography,
  notification,
  theme,
} from 'antd';
import ModalRender from '@/pages/shared/modal/ModalRender';
import { EyeOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useSearchOrders } from '@/loaders/order.loader';
import { REGIONS } from '@/constants/region';
import {
  DistrictProps,
  ProvinceProps,
  WardProps,
} from '@/models/delivery-address';
import {
  ORDERS_FILTER_STATUSES,
  ORDERS_PAIDS,
  ORDERS_PAYMENTS,
} from '@/constants/config';
import Item from 'antd/es/descriptions/Item';
import styles from '../scss/OrdersInfo.module.scss';
import Link from 'next/link';

interface Props {
  code: string;
}

const { useToken } = theme;

const OrdersInfoModal = ({ code }: Props) => {
  const t = useTranslations('account');
  const { token } = useToken();

  const { open, close, isOpen } = useDisclosure();

  const currentOrder = useSearchOrders({
    params: {
      searchData: code,
    },
    config: {
      onSuccess: (response) => {},
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
    enabled: isOpen,
  });

  const getInfoDeliveryAddress = (id: string, type: number) => {
    if (type == 1) {
      const province = REGIONS.find((item) => item.Id == id);
      return province as ProvinceProps;
    }

    if (type == 2) {
      const districts = REGIONS.map((item) => item.Districts).flat(1);
      const district = districts.find((item) => item.Id == id);
      return district as DistrictProps;
    }

    if (type == 3) {
      const districts = REGIONS.map((item) => item.Districts).flat(1);
      const wards = districts.map((item) => item.Wards).flat(1);
      const ward = wards.find((item: any) => item.Id == id);
      return ward as WardProps;
    }
  };

  const handleOpen = () => {
    open();
  };

  const handleClose = () => {
    close();
  };

  return (
    <>
      <ModalRender
        customHeader={true}
        title={<Typography.Text>{t('order.info')}</Typography.Text>}
        buttonRender={
          <Tooltip title={t('order.info')}>
            <Button
              type="primary"
              shape="circle"
              icon={<EyeOutlined />}
              className="btn-edit"
              onClick={handleOpen}
            />
          </Tooltip>
        }
        open={isOpen}
        handleCancel={handleClose}
        hideOkButton
      >
        {currentOrder?.isLoading ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <div
              className="loader"
              style={{ background: token.colorPrimary }}
            ></div>
          </Flex>
        ) : (
          <>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.order_code')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {currentOrder?.data?.orders?.[0]?.ordersCode}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>{t('order.fields.total')}</Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {(
                  Number(currentOrder?.data?.orders?.[0]?.total) +
                  Number(currentOrder?.data?.orders?.[0]?.transportFee)
                ).toLocaleString() + ' VND'}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.consignee_info')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {currentOrder?.data?.orders?.[0]?.deliveryAddress.consigneeName}
                ,
                {' ' +
                  currentOrder?.data?.orders?.[0]?.deliveryAddress
                    .consigneePhone}
                ,{' '}
                {currentOrder?.data?.orders?.[0]?.deliveryAddress.country == 1
                  ? `${
                      currentOrder?.data?.orders?.[0]?.deliveryAddress
                        .deliveryAddressName
                    }, ${
                      getInfoDeliveryAddress(
                        currentOrder?.data?.orders?.[0]?.deliveryAddress
                          .province,
                        1,
                      )?.Name
                    }, 
                          ${
                            getInfoDeliveryAddress(
                              currentOrder?.data?.orders?.[0]?.deliveryAddress
                                .district,
                              2,
                            )?.Name
                          }, 
                          ${
                            getInfoDeliveryAddress(
                              currentOrder?.data?.orders?.[0]?.deliveryAddress
                                .ward,
                              3,
                            )?.Name
                          }`
                  : currentOrder?.data?.orders?.[0]?.deliveryAddress
                      .deliveryAddressName}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.payment_type')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {ORDERS_PAYMENTS.map(
                  (item, index) =>
                    currentOrder?.data?.orders?.[0]?.payment == item.value && (
                      <span key={index}>{item.label}</span>
                    ),
                )}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.order_status')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {ORDERS_FILTER_STATUSES.map(
                  (item, index) =>
                    currentOrder?.data?.orders?.[0].status == item.value && (
                      <span
                        key={index}
                        style={{
                          color: item?.color,
                        }}
                      >
                        {item.label}
                      </span>
                    ),
                )}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.payment_status')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {ORDERS_PAIDS.map(
                  (item, index) =>
                    currentOrder?.data?.orders?.[0]?.paid == item.value && (
                      <span
                        key={index}
                        style={{
                          color:
                            currentOrder?.data?.orders?.[0]?.paid == 1
                              ? 'green'
                              : 'red',
                        }}
                      >
                        {item.label}
                      </span>
                    ),
                )}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.total_product')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {Number(
                  currentOrder?.data?.orders?.[0]?.total,
                ).toLocaleString() + ' VND'}
              </Typography.Text>
            </Flex>
            <Flex align="center" style={{ marginBottom: 20 }}>
              <Flex
                justify="space-between"
                align="center"
                style={{ width: 200, paddingRight: 30 }}
              >
                <Typography.Text>
                  {t('order.fields.transport_fee')}
                </Typography.Text>
                <span>:</span>
              </Flex>
              <Typography.Text>
                {Number(
                  currentOrder?.data?.orders?.[0]?.transportFee,
                ).toLocaleString() + ' VND'}
              </Typography.Text>
            </Flex>
            <Divider />
            <div>
              <Flex>
                <Typography.Text>{t('order.product_list')}</Typography.Text>
              </Flex>
              <List>
                {currentOrder?.data?.orders?.[0]?.ordersDetails?.map(
                  (item: any, index: number) => (
                    <Item key={index}>
                      <Row gutter={[20, 20]} className={styles.item}>
                        <Col span={3} md={3} lg={3}>
                          <Flex align="center">
                            <img
                              src={item.color.images[0].picture}
                              className={styles.image}
                              alt="Image"
                            />
                          </Flex>
                        </Col>
                        <Col span={21} md={21} lg={21}>
                          <Flex
                            justify="center"
                            style={{ height: '100%' }}
                            vertical
                          >
                            <Link
                              href={'/' + item.product.path}
                              style={{ fontWeight: 'bold' }}
                            >
                              {item.product.productName}
                            </Link>
                            <Flex>
                              <Typography.Text style={{ color: 'grey' }}>
                                {item.color.colorName}/{item.size.sizeName}
                                /x
                                {item.quantity}/
                                {Number(item.price).toLocaleString()}{' '}
                              </Typography.Text>
                            </Flex>
                          </Flex>
                        </Col>
                      </Row>
                    </Item>
                  ),
                )}
              </List>
            </div>
          </>
        )}
      </ModalRender>
    </>
  );
};

export default OrdersInfoModal;
