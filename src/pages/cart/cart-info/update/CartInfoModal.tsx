import { CARTDETAIL_STATUS } from '@/constants/config';
import { queryClient } from '@/lib/react-query';
import { useUpdateCartDetail } from '@/loaders/cart-detail.loader';
import { CACHE_CART } from '@/loaders/cart.loader';
import { useGetByIdProduct } from '@/loaders/product.loader';
import { CartDetailProps } from '@/models/cart-detail';
import { ProductProps } from '@/models/product';
import { ProductColorsProps } from '@/models/product-color';
import { ProductSizeProps } from '@/models/product-size';
import ModalRender from '@/pages/shared/modal/ModalRender';
import { useDisclosure } from '@/utils/modal';
import { RULES_FORM } from '@/utils/validator';
import { EditOutlined } from '@ant-design/icons';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  notification,
  Row,
  Select,
  theme,
  Tooltip,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const { useToken } = theme;

interface Props {
  record?: CartDetailProps;
  cartDetails?: CartDetailProps[];
}

const CartInfoModal = ({ record, cartDetails }: Props) => {
  const t = useTranslations('cart');
  const { open, close, isOpen } = useDisclosure();
  const { token } = useToken();
  const [form] = useForm();
  const [choosedColor, setChoosedColor] = useState<ProductColorsProps>();
  const [choosedSize, setChoosedSize] = useState<ProductSizeProps>();

  const currentProduct = useGetByIdProduct({
    id: (record?.product as ProductProps)?._id || '',
    config: {
      onSuccess: (response) => {
        form.setFieldsValue({
          ...response,
          ...record,
          active: String(record?.active),
          color_id: String((record?.color as ProductColorsProps)?._id),
          size_id: String((record?.size as ProductSizeProps)?._id),
          price: (record?.color as ProductColorsProps)?.discount
            ? (record?.color as ProductColorsProps)?.discount?.symbol == 1
              ? Math.round(
                  Number((record?.color as ProductColorsProps)?.price) *
                    ((100 -
                      Number(
                        (record?.color as ProductColorsProps)?.discount?.value,
                      )) /
                      100),
                )
              : Math.round(
                  Number((record?.color as ProductColorsProps)?.price) -
                    Number(
                      (record?.color as ProductColorsProps)?.discount?.value,
                    ),
                )
            : Number((record?.color as ProductColorsProps)?.price),
        });
        setChoosedColor(record?.color as ProductColorsProps);
        setChoosedSize(record?.size as ProductSizeProps);
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
    enabled: isOpen,
  });

  const updateCartDetail = useUpdateCartDetail({
    id: record?._id || '',
    config: {
      onSuccess: (_) => {
        queryClient.invalidateQueries([CACHE_CART.SEARCH]);

        notification.success({
          message: t('update_success'),
        });

        handleClose?.();
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
  });

  const handleChoosedColor = (e: any) => {
    const color = currentProduct?.data?.colors?.find(
      (color: ProductColorsProps) => color?._id == e,
    );

    form.setFieldValue('color_id', e);
    setChoosedColor(color);
    setChoosedSize(undefined);
    form.setFieldValue('size_id', null);
  };

  const handleChoosedSize = (e: any) => {
    form.setFieldValue('size_id', e);

    setChoosedSize(
      choosedColor?.sizes?.find((size: ProductSizeProps) => size?._id == e),
    );
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {

        const checkExisted = cartDetails
          ?.filter(
            (d: CartDetailProps) =>
              (d?.product as ProductProps)?._id !=
                (record?.product as ProductProps)?._id ||
              (d?.color as ProductColorsProps)?._id !=
                (record?.color as ProductColorsProps)?._id ||
              (d?.size as ProductSizeProps)?._id !=
                (record?.size as ProductSizeProps)?._id,
          )
          ?.find(
            (record: CartDetailProps) =>
              (record?.product as ProductProps)?._id ==
                currentProduct?.data?._id &&
              (record?.color as ProductColorsProps)?._id == choosedColor?._id &&
              (record?.size as ProductSizeProps)?._id == choosedSize?._id,
          );

        if (checkExisted) {
          notification.warning({
            message: t('create_product_warning'),
          });
          return;
        }

        if ((choosedSize && values?.quantity > choosedSize?.quantity) || values?.quantity == 0) {
          notification.warning({
            message: t('quantity_product_warning'),
          });
          return;
        }


        updateCartDetail?.mutate({
          ...record,
          ...values,
          size: choosedSize,
          color: choosedColor,
        });
      })
      .catch(() => {
        notification.warning({
          message: t('product.validate_form'),
        });
      });
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
        title={<Typography.Text>{t('update_product')}</Typography.Text>}
        buttonRender={
          <Tooltip title={t('update_product')}>
            <Button
              type="primary"
              shape="circle"
              icon={<EditOutlined />}
              className="btn-edit"
              onClick={handleOpen}
            />
          </Tooltip>
        }
        open={isOpen}
        handleCancel={handleClose}
        handleSubmit={handleSubmit}
        confirmLoading={updateCartDetail?.isLoading}
      >
        {currentProduct?.isLoading ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <div
              className="loader"
              style={{ background: token.colorPrimary }}
            ></div>
          </Flex>
        ) : (
          <Form form={form} layout="vertical">
            <Row gutter={[24, 24]}>
              <Col span={24} md={12} lg={12}>
                <FormItem
                  labelCol={{ span: 7 }}
                  label={t('product')}
                  rules={[...RULES_FORM.required]}
                >
                  <Input
                    placeholder={t('product')}
                    value={(record?.product as ProductProps)?.productName}
                    readOnly
                  />
                </FormItem>
              </Col>
              <Col span={24} md={12} lg={12}>
                <FormItem
                  labelCol={{ span: 7 }}
                  label={t('status')}
                  name={'active'}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    options={CARTDETAIL_STATUS}
                    placeholder={t('status')}
                  />
                </FormItem>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} md={12} lg={12}>
                <Row>
                  <Col span={22} md={22} lg={22}>
                    <FormItem
                      labelCol={{ span: 7 }}
                      label={t('color')}
                      name="color_id"
                      rules={[...RULES_FORM.required]}
                    >
                      <Select
                        onSelect={handleChoosedColor}
                        options={currentProduct?.data?.colors?.map(
                          (color: ProductColorsProps) => ({
                            label: color?.colorName,
                            value: color?._id,
                          }),
                        )}
                        placeholder={t('color')}
                      />
                    </FormItem>
                  </Col>
                  <Col span={2} md={2} lg={2}>
                    <Flex style={{ height: '100%' }} align="end" justify="end">
                      <Button
                        type="text"
                        style={{
                          backgroundColor: choosedColor?.hex,
                          border: '1px solid #d6d6d6',
                          marginBottom: 24,
                        }}
                      />
                    </Flex>
                  </Col>
                </Row>
              </Col>
              <Col span={24} md={12} lg={12}>
                <FormItem
                  labelCol={{ span: 7 }}
                  label={t('size')}
                  name="size_id"
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    onSelect={handleChoosedSize}
                    options={choosedColor?.sizes?.map(
                      (size: ProductSizeProps) => ({
                        label: size?.sizeName,
                        value: size?._id,
                      }),
                    )}
                    placeholder={t('size')}
                  />
                </FormItem>
              </Col>
              <Col span={24} md={12} lg={12}>
                <FormItem
                  labelCol={{ span: 7 }}
                  label={`${t('quantity')} (${choosedSize?.quantity || 0})`}
                  name="quantity"
                  rules={[...RULES_FORM.required, ...RULES_FORM.number]}
                >
                  <Input
                    placeholder={t('quantity')}
                    style={{ width: '100%' }}
                  />
                </FormItem>
              </Col>
              <Col span={24} md={12} lg={12}>
                <FormItem
                  labelCol={{ span: 10 }}
                  label={`${t('price')} ${
                    (record?.color as ProductColorsProps)?.discount
                      ? `(giảm giá ${(record?.color as ProductColorsProps)?.discount?.value}${
                        (record?.color as ProductColorsProps)?.discount
                          .symbol == 1
                          ? '%'
                          : 'K'
                      })`
                      : ``
                  }`}
                  name="price"
                  rules={[...RULES_FORM.required, ...RULES_FORM.number]}
                >
                  <Input
                    placeholder={t('price')}
                    style={{ width: '100%' }}
                    readOnly
                  />
                </FormItem>
              </Col>
            </Row>
          </Form>
        )}
      </ModalRender>
    </>
  );
};

export default CartInfoModal;
