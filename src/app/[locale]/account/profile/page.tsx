import Profile from '@/pages/account/profile/Profile';
import { useTranslations } from 'next-intl';
import { NAME } from '@/constants/config';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('account.profile_title')} | ${NAME}`,
  };
}

export default function ProfilePage() {
  const t = useTranslations('account');

  return (
    <>
      <Profile />
    </>
  );
}
