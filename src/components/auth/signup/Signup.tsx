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
import Link from 'next/link';
import { LOGIN_PATH } from '@/paths';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import authPicture from '@/assets/images/auth/auth.png';
import { useSignup } from '@/loaders/auth.loader';

const Signup = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [form] = useForm();

  const signup = useSignup({
    config: {
      onSuccess: (_) => {
        notification.success({
          message: t('messages.register_success'),
        });

        form.resetFields();
      },
      onError: (error: any) => {
        notification.error({
          message: error?.response?.data?.message,
        });
      },
    },
  });

  const handleSubmit = () => {
    form
      .validateFields()
      .then(async (values) => {
        signup.mutate({
          ...values,
          role: 5,
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
            {t('auth.signup.title')}
          </Typography.Title>

          <Row gutter={[24, 24]}>
            <Col span={24} md={12} lg={12}>
              <div className={styles.inner}>
                <div className={styles.layoutContainer}>
                  <div>
                    <Form form={form} className={styles.form}>
                      <FormItem
                        className={styles.formItem}
                        name={'customerName'}
                        rules={[...RULES_FORM.required]}
                      >
                        <Input
                          className={styles.formInput}
                          placeholder={t('auth.signup.customer_name')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                      <FormItem
                        className={styles.formItem}
                        name={'phone'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.phone]}
                      >
                        <Input
                          className={styles.formInput}
                          placeholder={t('auth.signup.phone')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                      <FormItem
                        className={styles.formItem}
                        name={'email'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.email]}
                      >
                        <Input
                          className={styles.formInput}
                          placeholder={t('auth.signup.email')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                      <FormItem
                        className={styles.formItem}
                        name={'username'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.username]}
                      >
                        <Input
                          className={styles.formInput}
                          placeholder={t('auth.signup.username')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                      <FormItem
                        className={styles.formItem}
                        name={'password'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.password]}
                      >
                        <Input.Password
                          className={`${styles.formInput} ${styles.formPassword}`}
                          placeholder={t('auth.signup.password')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                      <FormItem
                        className={styles.formItem}
                        name={'password_confirmation'}
                        dependencies={['password']}
                        rules={[
                          ...RULES_FORM.required,
                          ...RULES_FORM.password,
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (
                                !value ||
                                getFieldValue('password') === value
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
                          placeholder={t('auth.signup.password_confirm')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                    </Form>
                  </div>
                  <div>
                    <Button
                      className={styles.btnSubmit}
                      onClick={handleSubmit}
                      loading={signup?.isLoading}
                    >
                      {t('auth.signup.title')}
                    </Button>
                  </div>
                  <Flex
                    className={styles.footerContainer}
                    justify="center"
                    align="center"
                  >
                    <Typography.Text>
                      {t('auth.signup.footer')}?
                    </Typography.Text>
                    <Link href={`/${locale}/${LOGIN_PATH}`}>
                      {t('auth.login.title')}
                    </Link>
                  </Flex>
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

export default Signup;
