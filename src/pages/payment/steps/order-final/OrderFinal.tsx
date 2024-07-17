import { Card, Col, Divider, Flex, Row, Select, Typography } from 'antd';
import Form, { useForm } from 'antd/es/form/Form';
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { useTranslations } from 'next-intl';
import styles from './OrderFinal.module.scss';
import { RULES_FORM } from '@/utils/validator';
import { ORDERS_PAYMENTS } from '@/constants/config';
import { useEffect } from 'react';

interface Props {
  totalPrice?: number;
  submitForm?: boolean;
  onFinish?: (values: any) => void;
}
const OrderFinal = ({ totalPrice, submitForm, onFinish }: Props) => {
  const t = useTranslations('payment');
  const [form] = useForm();

  useEffect(() => {
    if (submitForm) {
      form.submit();
    }
  }, [submitForm]);

  const onSubmit = (values: any) => {
    if (onFinish) {
      onFinish(values);
    }
  };

  return (
    <>
      <div className="ptb-3">
        <Flex align="center" justify="space-between" className={styles.title}>
          <Typography.Title>{`${t('order')}`}</Typography.Title>
          <Typography.Title>
            {`${totalPrice?.toLocaleString()} VND`}
          </Typography.Title>
        </Flex>
        <Divider />
        <Form form={form} layout="vertical" onFinish={onSubmit}>
          <FormItem labelCol={{ span: 5 }} label={t('note')} name="note">
            <TextArea placeholder={t('note')} rows={6} />
          </FormItem>
          <FormItem
            labelCol={{ span: 7 }}
            label={t('payment_type')}
            name={'payment'}
            rules={[...RULES_FORM.required]}
          >
            <Select
              options={ORDERS_PAYMENTS?.filter((item: any) => item?.value != 1)}
              placeholder={t('payment_type')}
            />
          </FormItem>
        </Form>

        <Row gutter={[24, 24]}>
          <Col span={24} md={12} lg={12}>
            <Card title={'Lưu ý'} className={styles.card}>
              Tổng tiền chưa bao gồm phí vận chuyển, quý khách vui lòng thanh
              toán phí vận chuyển khi nhận hàng. Phí vận chuyển sẽ được cập nhật
              khi chúng tôi giao cho bên vận chuyển. Vui lòng kiểm tra đơn hàng
              của bạn trong mục account để xem phí vận chuyển được cập nhật
            </Card>
          </Col>
          <Col span={24} md={12} lg={12}>
            <Card
              title={'Hướng dẫn thanh toán chuyển khoản'}
              className={styles.card}
            >
              * SỐ TÀI KHOẢN : 1030112475 * CHỦ TÀI KHOẢN : CÔNG TY TNHH MAVERIK
              STUDIO * NGÂN HÀNG VIETCOMBANK ĐỂ ĐẢM BẢO VIỆC HOÀN TẤT ĐƠN HÀNG
              NHANH CHÓNG, KHÁCH HÀNG VUI LÒNG CHUYỂN KHOẢN NHANH 24/7. - KHI
              CHUYỂN KHOẢN BẮT BUỘC PHẢI ĐỂ NỘI DUNG CHUYỂN KHOẢN : " MÃ ĐƠN
              HÀNG " ( Ví Dụ : 100305 ) - MỖI KHÁCH HÀNG CÓ TỐI ĐA 02 GIỜ ĐỂ
              HOÀN TẤT VIỆC THANH TOÁN CHUYỂN KHOẢN. - CÁC ĐƠN HÀNG SAU 02 GIỜ
              KHÔNG CHUYỂN KHOẢN SẼ BỊ HUỶ ĐƠN HÀNG MÀ KHÔNG CẦN BÁO TRƯỚC.
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default OrderFinal;
