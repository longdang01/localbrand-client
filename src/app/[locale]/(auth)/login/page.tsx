import Login from '@/pages/auth/login/Login';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

export default function LoginPage() {
  const t = useTranslations('auth');

  const LOGIN_BREADCRUMB = [
    {
      title: <span>{t('login.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={LOGIN_BREADCRUMB} />

      <Login />
    </>
  );
}
