'use client';

import { useChangePassword, useGetMe } from '@/loaders/auth.loader';
import { RULES_FORM } from '@/utils/validator';
import {
  Button,
  Col,
  Flex,
  Form,
  Input,
  Row,
  Typography,
  notification,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useTranslations } from 'next-intl';

const ChangePassword = () => {
  const t = useTranslations('account');
  const [form] = useForm();
  const currentUsers = useGetMe({});

  const changePassword = useChangePassword({
    config: {
      onSuccess: (_) => {
        notification.success({
          message: t('change_password.change_password_success'),
        });

        setTimeout(() => {
          localStorage.clear();
          location.reload();
        }, 300);
      },
      onError: (error: any) => {
        notification.error({
          message: error?.response?.data?.detail || error?.message,
        });
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values: any) => {
        changePassword.mutate({
          ...values,
          username: currentUsers?.data?.username,
        });
      })
      .catch(() => {
        notification.warning({ message: t('change_password.validate_form') });
      });
  };

  return (
    <>
      <div className="area">
        <Typography.Text className="account-title">
          {t('change_password.title')}
        </Typography.Text>

        <Form form={form}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={16} lg={16}>
              <Form.Item
                labelCol={{ span: 7 }}
                name={'oldPassword'}
                hasFeedback
                rules={[...RULES_FORM.required, ...RULES_FORM.password]}
              >
                <Input.Password
                  placeholder={t('change_password.fields.password_current')}
                ></Input.Password>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 7 }}
                name={'newPassword'}
                rules={[...RULES_FORM.required, ...RULES_FORM.password]}
                hasFeedback
              >
                <Input.Password
                  placeholder={t('change_password.fields.password_new')}
                ></Input.Password>
              </Form.Item>
              <Form.Item
                labelCol={{ span: 7 }}
                name={'newPasswordConfirm'}
                dependencies={['newPassword']}
                rules={[
                  ...RULES_FORM.required,
                  ...RULES_FORM.password,
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('newPassword') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(t('change_password.error_confirm_password')),
                      );
                    },
                  }),
                ]}
                hasFeedback
              >
                <Input.Password
                  placeholder={t('change_password.fields.password_new_confirm')}
                ></Input.Password>
              </Form.Item>
              <Flex justify="end" align="center" style={{ marginTop: 50 }}>
                <Button
                  type="primary"
                  loading={changePassword?.isLoading}
                  onClick={handleSubmit}
                >
                  {t('change_password.ok_text')}
                </Button>
              </Flex>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default ChangePassword;
