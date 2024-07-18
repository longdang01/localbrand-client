'use client';

import { useLocale, useTranslations } from 'next-intl';
import styles from '../Auth.module.scss';
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
import FormItem from 'antd/es/form/FormItem';
import { RULES_FORM } from '@/utils/validator';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import authPicture from '@/assets/images/auth/auth.png';
import { useResetPassword } from '@/loaders/auth.loader';
import { logout } from '@/services/user.service';
import { LOGIN_PATH } from '@/paths';
import { useParams, useRouter } from 'next/navigation';

const ResetPassword = () => {
  const t = useTranslations();
  const [form] = useForm();
  const locale = useLocale();
  const router = useRouter();
  const params = useParams();

  const resetPassword = useResetPassword({
    config: {
      onSuccess: async () => {
        notification.success({
          message: t('messages.reset_password_success'),
        });
        const userStorage = localStorage.getItem('user');
        if (userStorage) await logout();

        localStorage.clear();
        router.push(`/${locale}/${LOGIN_PATH}`);
      },
      onError: (error) => {
        notification.error({
          message: error?.response?.data?.detail || error?.message,
        });
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        resetPassword.mutate({
          ...values,
          id: params?.id,
          token: params?.token,
        });
      })
      .catch(() => {
        notification.warning({
          message: t('messages.validate_form'),
        });
      });
  };

  return (
    <>
      <div className="layout-client">
        <div className={styles.container}>
          <Typography.Title className={styles.heading}>
            {t('auth.reset_password.title')}
          </Typography.Title>

          <Row gutter={[24, 24]}>
            <Col span={24} md={12} lg={12}>
              <div className={styles.inner}>
                <div className={styles.layoutContainer}>
                  <div>
                    <Form form={form} className={styles.form} layout="vertical">
                      <FormItem
                        className={styles.formItem}
                        name={'newPassword'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.password]}
                        hasFeedback
                      >
                        <Input.Password
                          className={`${styles.formInput} ${styles.formPassword}`}
                          placeholder={t('auth.reset_password.new_password')}
                          onPressEnter={handleSubmit}
                        ></Input.Password>
                      </FormItem>
                      <FormItem
                        className={styles.formItem}
                        name={'newConfirmPassword'}
                        dependencies={['newPassword']}
                        rules={[
                          ...RULES_FORM.required,
                          ...RULES_FORM.password,
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('newPassword') === value
                              ) {
                                return Promise.resolve();
                              }
                              return Promise.reject(
                                new Error(t('messages.error_confirm_password')),
                              );
                            },
                          }),
                        ]}
                        hasFeedback
                      >
                        <Input.Password
                          className={`${styles.formInput} ${styles.formPassword}`}
                          placeholder={t(
                            'auth.reset_password.confirm_new_password',
                          )}
                          onPressEnter={handleSubmit}
                        ></Input.Password>
                      </FormItem>
                    </Form>
                  </div>
                  <div>
                    <Button
                      className={styles.btnSubmit}
                      onClick={handleSubmit}
                      loading={resetPassword?.isLoading}
                    >
                      {t('auth.reset_password.title')}
                    </Button>
                  </div>
                </div>
              </div>
            </Col>
            <Col span={24} md={12} lg={12}>
              <Flex justify="center" style={{ paddingTop: 45 }}>
                <Image
                  src={authPicture}
                  alt="auth-bg"
                  className={styles.authBg}
                />
              </Flex>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
