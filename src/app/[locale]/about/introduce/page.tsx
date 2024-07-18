import { NAME } from '@/constants/config';
import Introduce from '@/components/about/introduce/Introduce';
import BreadcrumbRender from '@/components/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('introduce.title')} | ${NAME}`,
    description: `${t('introduce.description')}`,
  };
}

export default function IntroducePage() {
  const t = useTranslations('about');

  const INTRODUCE_BREADCRUMB = [
    {
      title: <span>{t('introduce.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={INTRODUCE_BREADCRUMB} />

      <Introduce />
    </>
  );
}
