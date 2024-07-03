import { useDisclosure } from '@/utils/modal';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Tooltip,
  Typography,
  notification,
  theme,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { RULES_FORM } from '@/utils/validator';
import FormItem from 'antd/es/form/FormItem';
import { useEffect, useState } from 'react';
import {
  CACHE_DELIVERY_ADDRESS,
  useCreateDeliveryAddress,
  useGetByIdDeliveryAddress,
  useUpdateDeliveryAddress,
} from '@/loaders/delivery-address.loader';
import { queryClient } from '@/lib/react-query';
import ModalRender from '@/pages/shared/modal/ModalRender';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { REGIONS } from '@/constants/region';
import { DistrictProps, WardProps } from '@/models/delivery-address';
import { useGetMe } from '@/loaders/auth.loader';

interface Props {
  id: string;
}

const { useToken } = theme;

const EditDeliveryAddressModal = ({ id }: Props) => {
  const t = useTranslations('account');
  const currentUser = useGetMe({});
  const { token } = useToken();

  const { open, close, isOpen } = useDisclosure();
  const [form] = useForm();

  const PLACES = [
    { label: t('address.place_vn'), value: '1' },
    { label: t('address.place_other'), value: '2' },
  ];

  const STATUS = [
    { label: t('address.status_default'), value: '1' },
    { label: t('address.status_normal'), value: '2' },
  ];

  const [place, setPlace] = useState<string>();
  const handleChangePlace = (e: string) => {
    setPlace(e);
  };

  const [districts, setDistricts] = useState<DistrictProps[]>();
  const [wards, setWards] = useState<WardProps[]>();

  const currentAddress = useGetByIdDeliveryAddress({
    id,
    config: {
      onSuccess: (response) => {
        form.setFieldsValue({
          ...response,
          active: String(response?.active),
        });

        setPlace(response?.country);
        const districts = REGIONS?.find(
          (r) => r.Id == response?.province,
        )?.Districts;
        setDistricts(districts);
        setWards(districts?.find((r) => r.Id == response?.district)?.Wards);
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
    enabled: isOpen,
  });

  const updateAddress = useUpdateDeliveryAddress({
    id: id,
    config: {
      onSuccess: (_) => {
        queryClient.invalidateQueries([CACHE_DELIVERY_ADDRESS.SEARCH]);

        notification.success({
          message: t('address.update_success'),
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

  useEffect(() => {
    form.resetFields();
  }, [isOpen]);

  const handleOpen = () => {
    open();
  };

  const handleClose = () => {
    close();
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        updateAddress.mutate({
          ...values,
          customer: currentUser?.data?.customer?._id,
        });
      })
      .catch(() => {
        notification.warning({
          message: t('address.validate_form'),
        });
      });
  };

  const handleChangeProvince = (e: string) => {
    form.setFieldValue('district', undefined);
    form.setFieldValue('ward', undefined);

    const districts = REGIONS?.find((r) => r.Id == e)?.Districts;
    setDistricts(districts);
  };

  const handleChangeDistrict = (e: string) => {
    form.setFieldValue('ward', undefined);

    const wards = districts?.find((r) => r.Id == e)?.Wards;
    setWards(wards);
  };

  return (
    <>
      <ModalRender
        customHeader={true}
        title={<Typography.Text>{t('address.update')}</Typography.Text>}
        buttonRender={
          <Tooltip title={t('address.update')}>
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
        confirmLoading={updateAddress?.isLoading}
      >
        {currentAddress?.isLoading ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <div
              className="loader"
              style={{ background: token.colorPrimary }}
            ></div>
          </Flex>
        ) : (
          <Form form={form}>
            <Row gutter={[24, 0]}>
              <Col span={24} md={24} lg={24}>
                <FormItem
                  labelCol={{ span: 5 }}
                  label={t('address.fields.consignee_name')}
                  name="consigneeName"
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t('address.fields.consignee_name')} />
                </FormItem>
              </Col>
              <Col span={24} md={24} lg={24}>
                <FormItem
                  labelCol={{ span: 5 }}
                  label={t('address.fields.consignee_phone')}
                  name="consigneePhone"
                  rules={[...RULES_FORM.required, ...RULES_FORM.phone]}
                >
                  <Input placeholder={t('address.fields.consignee_phone')} />
                </FormItem>
              </Col>
              <Col span={24} md={24} lg={24}>
                <FormItem
                  labelCol={{ span: 5 }}
                  label={t('address.fields.place')}
                  name={'country'}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    placeholder={t('address.fields.place')}
                    options={PLACES}
                    value={place}
                    onChange={handleChangePlace}
                  />
                </FormItem>
              </Col>
              <Col span={24} md={24} lg={24}>
                <FormItem
                  labelCol={{ span: 5 }}
                  label={t('address.fields.status')}
                  name={'active'}
                  rules={[...RULES_FORM.required]}
                >
                  <Select
                    placeholder={t('address.fields.status')}
                    options={STATUS}
                  />
                </FormItem>
              </Col>
              <Col span={24} md={24} lg={24}>
                <FormItem
                  labelCol={{ span: 5 }}
                  label={t('address.fields.delivery_address_name')}
                  name={'deliveryAddressName'}
                  rules={[...RULES_FORM.required]}
                >
                  <Input
                    placeholder={
                      Number(place) == 1
                        ? t('address.placeholder_vn')
                        : t('address.placeholder_other')
                    }
                  />
                </FormItem>
              </Col>
              {Number(place) == 1 && (
                <>
                  <Col span={24} md={24} lg={24}>
                    <FormItem
                      labelCol={{ span: 5 }}
                      label={t('address.fields.province')}
                      name={'province'}
                      rules={[...RULES_FORM.required]}
                    >
                      <Select
                        placeholder={t('address.fields.province')}
                        options={REGIONS?.map((location: any) => ({
                          label: location?.Name,
                          value: location?.Id,
                        }))}
                        onChange={handleChangeProvince}
                      />
                    </FormItem>
                  </Col>
                  <Col span={24} md={24} lg={24}>
                    <FormItem
                      labelCol={{ span: 5 }}
                      label={t('address.fields.district')}
                      name={'district'}
                      rules={[...RULES_FORM.required]}
                    >
                      <Select
                        placeholder={t('address.fields.district')}
                        options={districts?.map((location: any) => ({
                          label: location?.Name,
                          value: location?.Id,
                        }))}
                        onChange={handleChangeDistrict}
                      />
                    </FormItem>
                  </Col>
                  <Col span={24} md={24} lg={24}>
                    <FormItem
                      labelCol={{ span: 5 }}
                      label={t('address.fields.ward')}
                      name={'ward'}
                      rules={[...RULES_FORM.required]}
                    >
                      <Select
                        placeholder={t('address.fields.ward')}
                        options={wards?.map((location: any) => ({
                          label: location?.Name,
                          value: location?.Id,
                        }))}
                      />
                    </FormItem>
                  </Col>
                </>
              )}
            </Row>
          </Form>
        )}
      </ModalRender>
    </>
  );
};

export default EditDeliveryAddressModal;
