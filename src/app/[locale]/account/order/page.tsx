import Orders from '@/components/account/orders/Orders';
import { useTranslations } from 'next-intl';
import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('account.order_title')} | ${NAME}`,
  };
}

export default function OrderPage() {
  const t = useTranslations('account');

  return (
    <>
      <Orders />
    </>
  );
}
