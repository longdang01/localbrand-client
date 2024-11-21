'use client';

import {
  ACCESS_TOKEN,
  DEFAULT_NAME_FILE_LIST,
  DEFAULT_STATUS_FILE_LIST,
  DEFAULT_UID_FILE_LIST,
  FORMAT_DATE,
} from '@/constants/config';
import { useGetMe } from '@/loaders/auth.loader';
import {
  CACHE_CUSTOMER,
  useGetByIdCustomer,
  useUpdateCustomer,
} from '@/loaders/customer.loader';
import { formatDate } from '@/utils/date';
import {
  Button,
  Col,
  DatePicker,
  DatePickerProps,
  Flex,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Typography,
  UploadFile,
  UploadProps,
  notification,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Upload, { RcFile } from 'antd/es/upload';
import dayjs from 'dayjs';
import { useState } from 'react';
import noImage from '@/assets/images/default/no-image.png';
import FormItem from 'antd/es/form/FormItem';
import { RULES_FORM } from '@/utils/validator';
import { useTranslations } from 'next-intl';
import { checkImageExists } from '@/utils/image';
import { queryClient } from '@/lib/react-query';
import { uploadFile } from '@/services/upload.service';
import storage from '@/utils/storage';

const Profile = () => {
  const t = useTranslations('account');
  const currentUser = useGetMe({
    enabled: !!storage.getStorage(ACCESS_TOKEN),
  });
  const [form] = useForm();
  const [isUpload, setIsUpload] = useState<boolean>(true);
  const [, setLoadingAvatar] = useState<boolean>(false);

  const currentCustomer = useGetByIdCustomer({
    id: currentUser?.data?.customer?._id,
    config: {
      onSuccess: (response) => {
        form.setFieldsValue({
          ...response,
          email: response?.user?.email,
          username: response?.user?.username,
          password: response?.user?.password,
          role: String(response?.user?.role),
        });
        form.setFieldValue('upload', '');
        form.setFieldValue(
          'dob',
          response?.dob
            ? dayjs(
                formatDate(response?.dob, 'YYYY-MM-DD', 'DD/MM/YYYY'),
                'DD/MM/YYYY',
              )
            : '',
        );
        setFileList([
          {
            uid: DEFAULT_UID_FILE_LIST,
            name: DEFAULT_NAME_FILE_LIST,
            status: DEFAULT_STATUS_FILE_LIST,
            url: response?.picture || noImage?.src,
          },
        ]);
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
    enabled: !!currentUser?.data?.customer?._id,
  });

  const updateCustomer = useUpdateCustomer({
    id: currentCustomer?.data?._id,
    config: {
      onSuccess: (_) => {
        queryClient.invalidateQueries([CACHE_CUSTOMER.GET_BY_ID]);

        notification.success({
          message: t('profile.update_success'),
        });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
  });

  const [fileList, setFileList] = useState<any[]>([]);

  const onChange: UploadProps['onChange'] = async ({
    fileList: newFileList,
  }) => {
    setFileList(newFileList);
  };

  const onRemove: UploadProps['onRemove'] = async () => {
    setFileList([]);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleChangeUrl = (e: any) => {
    setFileList([
      {
        uid: DEFAULT_UID_FILE_LIST,
        name: DEFAULT_NAME_FILE_LIST,
        status: DEFAULT_STATUS_FILE_LIST,
        url: e?.target?.value || noImage?.src,
      },
    ]);
  };

  const handleChangeRatio = (e: RadioChangeEvent) => {
    setIsUpload(e.target.value);

    setFileList([
      {
        uid: DEFAULT_UID_FILE_LIST,
        name: DEFAULT_NAME_FILE_LIST,
        status: DEFAULT_STATUS_FILE_LIST,
        url: currentCustomer?.data?.picture || noImage?.src,
      },
    ]);
    form.setFieldValue('picture', currentCustomer?.data?.picture || '');
  };

  const handleChangeDate: DatePickerProps['onChange'] = (
    _,
    dateString: any,
  ) => {
    form.setFieldValue('dob', dateString ? dayjs(dateString, FORMAT_DATE) : '');
  };

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        values.picture = values?.picture || currentCustomer?.data?.picture;
        values.dob = values?.dob && dayjs(values.dob).format('YYYY-MM-DD');

        if (isUpload && values?.upload) {
          let url = '';
          if (values?.upload?.fileList?.[0]) {
            const currentFile = values?.upload?.fileList?.[0].originFileObj;
            if (currentFile) delete currentFile['uid'];
            const formData: any = new FormData();
            formData.append('image', currentFile);

            setLoadingAvatar(true);
            const result = await uploadFile(formData);
            setLoadingAvatar(false);

            url = result.data.url;
          }
          values.picture = url;
        }

        updateCustomer.mutate({
          ...values,
          _id: currentCustomer?.data?._id,
          user: {
            ...currentCustomer?.data?.user,
            email: values?.email,
          },
        });
      })
      .catch(() => {
        notification.warning({
          message: t('profile.validate_form'),
        });
      });
  };

  return (
    <>
      <div className="">
        <Typography.Text className="account-title">
          {t('profile.title')}
        </Typography.Text>

        {currentCustomer?.isLoading ? (
          <Flex align="center" justify="center" style={{ height: '100%' }}>
            <div className="loader"></div>
          </Flex>
        ) : (
          <Form form={form}>
            <Row gutter={[24, 24]}>
              <Col span={24} md={16} lg={16}>
                <FormItem
                  labelCol={{ span: 7 }}
                  name={'username'}
                  rules={[...RULES_FORM.required, ...RULES_FORM.username]}
                >
                  <Input placeholder={t('profile.fields.username')} readOnly />
                </FormItem>
                <FormItem labelCol={{ span: 7 }} name="password" hidden>
                  <Input placeholder={t('profile.fields.password')} />
                </FormItem>
                <FormItem
                  labelCol={{ span: 7 }}
                  name="customerName"
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t('profile.fields.staff_name')} />
                </FormItem>
                <FormItem labelCol={{ span: 7 }} name="dob">
                  <DatePicker
                    onChange={handleChangeDate}
                    format={FORMAT_DATE}
                    placeholder={t('profile.fields.dob')}
                    style={{ width: '100%' }}
                  />
                </FormItem>
                <FormItem
                  labelCol={{ span: 7 }}
                  name="email"
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t('profile.fields.email')} />
                </FormItem>
                <FormItem
                  labelCol={{ span: 7 }}
                  name="phone"
                  rules={[...RULES_FORM.required]}
                >
                  <Input placeholder={t('profile.fields.phone')} />
                </FormItem>
                <FormItem labelCol={{ span: 7 }} name="address">
                  <Input placeholder={t('profile.fields.address')} />
                </FormItem>

                {!isUpload && (
                  <Form.Item
                    labelCol={{ span: 7 }}
                    name={'picture'}
                    rules={[
                      {
                        validator: async (_, value) => {
                          if (value) {
                            try {
                              await checkImageExists(value);
                              return Promise.resolve();
                            } catch (error) {
                              return Promise.reject(
                                new Error(t('profile.image_url_invalid')),
                              );
                            }
                          }
                          return Promise.resolve();
                        },
                      },
                    ]}
                  >
                    <Input
                      onChange={handleChangeUrl}
                      placeholder={t('profile.url')}
                    />
                  </Form.Item>
                )}

                <Flex align="center" justify="end" style={{ marginBottom: 24 }}>
                  <Radio.Group onChange={handleChangeRatio} value={isUpload}>
                    <Radio value={true}>{t('profile.upload')}</Radio>
                    <Radio value={false}>{t('profile.url')}</Radio>
                  </Radio.Group>
                </Flex>

                <Flex justify="end" align="center" style={{ marginTop: 50 }}>
                  <Button
                    type="primary"
                    loading={updateCustomer?.isLoading}
                    onClick={handleSubmit}
                  >
                    {t('profile.ok_text')}
                  </Button>
                </Flex>
              </Col>
              <Col span={24} md={8} lg={8}>
                <Form.Item name={'upload'}>
                  <Upload
                    listType="picture-circle"
                    name="avatar"
                    fileList={fileList}
                    onChange={onChange}
                    onPreview={onPreview}
                    onRemove={onRemove}
                    showUploadList={{
                      showRemoveIcon: isUpload ? true : false,
                    }}
                    beforeUpload={() => false}
                    accept="image/*"
                    className="upload-container"
                    style={{
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    {fileList.length < 1 && '+ Upload'}
                  </Upload>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        )}
      </div>
    </>
  );
};

export default Profile;
