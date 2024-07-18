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
import { useForgotPassword } from '@/loaders/auth.loader';
import { useRouter } from 'next/navigation';
import { LOGIN_PATH } from '@/paths';

const ForgotPassword = () => {
  const t = useTranslations();
  const [form] = useForm();
  const locale = useLocale();
  const router = useRouter();

  const forgotPassword = useForgotPassword({
    config: {
      onSuccess: (_) => {
        notification.success({
          message: t('messages.request_success'),
        });

        setTimeout(() => {
          router.push(`/${locale}/${LOGIN_PATH}`);
        }, 300);
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
        forgotPassword.mutate({ ...values, locale: locale });
      })
      .catch(() => {
        notification.warning({ message: t('messages.validate_form') });
      });
  };

  return (
    <>
      <div className="layout-client">
        <div className={styles.container}>
          <Typography.Title className={styles.heading}>
            {t('auth.forgot_password.title')}
          </Typography.Title>

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
                      loading={forgotPassword?.isLoading}
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
