import { NAME } from '@/constants/config';
import ResetPassword from '@/pages/auth/reset-password/ResetPassword';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('auth.reset_password_title')} | ${NAME}`,
  };
}

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
