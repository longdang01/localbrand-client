import Privacy from '@/pages/support/privacy/Privacy';

import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('support.privacy_title')} | ${NAME}`,
  };
}

export default function PrivacyPage() {
  return (
    <>
      <Privacy />
    </>
  );
}
