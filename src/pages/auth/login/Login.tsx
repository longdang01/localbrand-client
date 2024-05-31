'use client';

import { useTranslations } from 'next-intl';
import styles from '../Auth.module.scss';
import { Button, Col, Flex, Form, Input, Row, Typography } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { RULES_FORM } from '@/utils/validator';
import Link from 'next/link';
import { FORGOT_PASSWORD_PATH } from '@/paths';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import authPicture from '@/assets/images/auth/auth.png';

const Login = () => {
  const t = useTranslations();
  const [form] = useForm();

  const handleSubmit = () => {};

  return (
    <>
      <div className="layout-client">
        <div className={styles.container}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={12} lg={12}>
              <div className={styles.inner}>
                <div className={styles.layoutContainer}>
                  <div>
                    <Form form={form} className={styles.form}>
                      <FormItem
                        className={styles.formItem}
                        name={'username'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.username]}
                      >
                        <Input
                          className={styles.formInput}
                          placeholder={t('auth.login.username')}
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
                          placeholder={t('auth.login.password')}
                          onPressEnter={handleSubmit}
                        />
                      </FormItem>
                    </Form>
                  </div>
                  <div>
                    <Button
                      className={styles.btnSubmit}
                      onClick={handleSubmit}
                      // loading={login?.isLoading}
                    >
                      {t('auth.login.title')}
                    </Button>
                  </div>
                  <Flex
                    className={styles.footerContainer}
                    justify="center"
                    align="center"
                  >
                    <Typography.Text>
                      {t('auth.forgot_password.title')}?
                    </Typography.Text>
                    <Link href={FORGOT_PASSWORD_PATH}>
                      {t('global.click_here')}
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

export default Login;
