import ResetPassword from '@/pages/auth/reset-password/ResetPassword';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

export default function ResetPasswordPage() {
  const t = useTranslations('auth');

  const RESET_PASSWORD_BREADCRUMB = [
    {
      title: <span>{t('reset_password.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={RESET_PASSWORD_BREADCRUMB} />

      <ResetPassword />
    </>
  );
}
