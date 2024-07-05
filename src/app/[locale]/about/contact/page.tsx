import Contact from '@/pages/about/contact/Contact';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

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
