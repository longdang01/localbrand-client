import { NAME } from '@/constants/config';
import Login from '@/pages/auth/login/Login';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('auth.login_title')} | ${NAME}`,
  };
}

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
