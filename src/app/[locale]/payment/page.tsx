
import { NAME } from '@/constants/config';
import Payment from '@/pages/payment/Payment';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('payment.title')} | ${NAME}`,
    description: `${t('payment.description')}`,
  };
}

export default function PaymentPage() {
  const t = useTranslations('payment');

  const PAYMENT_BREADCRUMB = [
    {
      title: <span>{t('title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={PAYMENT_BREADCRUMB} />

      <Payment />
    </>
  );
}
