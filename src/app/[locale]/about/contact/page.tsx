import { NAME } from '@/constants/config';
import Contact from '@/pages/about/contact/Contact';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('contact.title')} | ${NAME}`,
    description: `${t('contact.description')}`,
  };
}

export default function ContactPage() {
  const t = useTranslations('about');

  const CONTACT_BREADCRUMB = [
    {
      title: <span>{t('contact.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={CONTACT_BREADCRUMB} />

      <Contact />
    </>
  );
}
