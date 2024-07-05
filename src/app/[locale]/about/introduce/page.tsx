import Introduce from '@/pages/about/introduce/Introduce';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

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
