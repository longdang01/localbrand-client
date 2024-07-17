import { NAME } from '@/constants/config';
import Signup from '@/pages/auth/signup/Signup';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('auth.signup_title')} | ${NAME}`,
  };
}

export default function SignupPage() {
  const t = useTranslations('auth');

  const SIGNUP_BREADCRUMB = [
    {
      title: <span>{t('signup.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={SIGNUP_BREADCRUMB} />

      <Signup />
    </>
  );
}
