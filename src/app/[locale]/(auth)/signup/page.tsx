import Signup from '@/pages/auth/signup/Signup';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

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
