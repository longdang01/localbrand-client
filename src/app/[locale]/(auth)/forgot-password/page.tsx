import { NAME } from '@/constants/config';
import ForgotPassword from '@/components/auth/forgot-password/ForgotPassword';
import BreadcrumbRender from '@/components/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('auth.forgot_password_title')} | ${NAME}`,
  };
}

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
