import Usage from '@/pages/support/usage/Usage';

import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('support.usage_title')} | ${NAME}`,
  };
}

export default function UsagePage() {
  return (
    <>
      <Usage />
    </>
  );
}
