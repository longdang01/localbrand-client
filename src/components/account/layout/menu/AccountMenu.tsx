'use client';

import { NavigationItem } from '@/models/sidebar';
import {
  ACCOUNT_ADDRESS,
  ACCOUNT_CHANGE_PASSWORD,
  ACCOUNT_ORDER,
  ACCOUNT_PROFILE,
} from '@/paths';
import { convertToMenuItems, getItem } from '@/utils/generate-menu';
import { Menu, Modal } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import { IoPower } from 'react-icons/io5';
import {
  MdLockOutline,
  MdOutlineAccountCircle,
  MdOutlinePlace,
  MdOutlineShoppingBag,
} from 'react-icons/md';
import styles from './AccountMenu.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useLoginState } from '@/stores/user.store';
import storage from '@/utils/storage';
import { ACCESS_TOKEN, ROLE } from '@/constants/config';
import useStorage from '@/utils/use-storage';
import { ItemType } from 'antd/es/menu/hooks/useItems';

const { confirm } = Modal;

const AccountMenu = () => {
  const t = useTranslations('account');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();
  const [, , clearAccessToken] = useStorage(ACCESS_TOKEN);
  const [, setLogged] = useLoginState((state) => [
    state.logged,
    state.setLogged,
  ]);

  const MENU: NavigationItem[] = [
    {
      key: ACCOUNT_PROFILE,
      label: t('profile.title'),
      icon: <MdOutlineAccountCircle />,
      children: [],
    },
    {
      key: ACCOUNT_ORDER,
      label: t('order.title'),
      icon: <MdOutlineShoppingBag />,
      children: [],
    },
    {
      key: ACCOUNT_ADDRESS,
      label: t('address.title'),
      icon: <MdOutlinePlace />,
      children: [],
    },
    {
      key: ACCOUNT_CHANGE_PASSWORD,
      label: t('change_password.title'),
      icon: <MdLockOutline />,
      children: [],
    },
    {
      key: 'logout',
      label: t('logout.title'),
      icon: <IoPower />,
      children: [],
    },
  ];

  const handleNavigate = (e: ItemType) => {
    if (e?.key == 'logout') {
      confirm({
        title: t('logout.title'),
        icon: <ExclamationCircleFilled />,
        content: t('logout.question'),
        onOk: () => {
          setLogged(false);

          storage.clearStorage(ACCESS_TOKEN);
          storage.clearStorage(ROLE);
          clearAccessToken();

          setTimeout(() => {
            router.push(`/${locale}`);
          }, 300);
          return;
        },
        okText: t('logout.ok'),
        cancelText: t('logout.cancel'),
      });
    } else router.push(`/${locale}/${e?.key}`);
  };

  return (
    <>
      <div className={styles.menu}>
        <Menu
          mode="inline"
          selectedKeys={[`${pathname?.replace(`/${locale}`, '')}`]}
          onClick={handleNavigate}
          items={convertToMenuItems(MENU, getItem)}
        />
      </div>
    </>
  );
};

export default AccountMenu;
