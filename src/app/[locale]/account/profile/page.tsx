import Profile from '@/pages/account/profile/Profile';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

export default function ProfilePage() {
  const t = useTranslations('account');

  return (
    <>
      <Profile />
    </>
  );
}
