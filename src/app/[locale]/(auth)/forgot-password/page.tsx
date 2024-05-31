import ForgotPassword from '@/pages/auth/forgot-password/ForgotPassword';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

export default function ForgotPasswordPage() {
  const t = useTranslations('auth');

  const FORGOT_BREADCRUMB = [
    {
      title: <span>{t('forgot_password.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={FORGOT_BREADCRUMB} />

      <ForgotPassword />
    </>
  );
}
