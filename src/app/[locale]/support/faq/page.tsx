import Faq from '@/pages/support/faq/Faq';
import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('support.faq_title')} | ${NAME}`,
  };
}

export default function FaqPage() {
  return (
    <>
      <Faq />
    </>
  );
}
