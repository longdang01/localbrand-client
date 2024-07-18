import Purchase from '@/components/support/purchase/Purchase';

import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('support.purchase_title')} | ${NAME}`,
  };
}

export default function PurchasePage() {
  return (
    <>
      <Purchase />
    </>
  );
}
