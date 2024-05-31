'use client';

import { useTranslations } from 'next-intl';
import styles from '../Auth.module.scss';
import { Button, Col, Flex, Form, Input, Row } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import { RULES_FORM } from '@/utils/validator';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import authPicture from '@/assets/images/auth/auth.png';

const ForgotPassword = () => {
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
                        name={'email'}
                        rules={[...RULES_FORM.required, ...RULES_FORM.email]}
                      >
                        <Input
                          className={styles.formInput}
                          placeholder={t('auth.forgot_password.email')}
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
                      {t('auth.forgot_password.title')}
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

export default ForgotPassword;
