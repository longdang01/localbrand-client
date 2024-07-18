import ChangePassword from '@/components/account/change-password/ChangePassword';
import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('account.change_password_title')} | ${NAME}`,
  };
}

export default function ChangePasswordPage() {
  return (
    <>
      <ChangePassword />
    </>
  );
}
