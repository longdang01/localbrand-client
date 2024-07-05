'use client';

import { NavigationItem } from '@/models/sidebar';
import {
  SUPPORT_FAQ,
  SUPPORT_PRIVACY,
  SUPPORT_PURCHASE,
  SUPPORT_USAGE,
} from '@/paths';
import { convertToMenuItems, getItem } from '@/utils/generate-menu';
import { Menu } from 'antd';
import { useLocale, useTranslations } from 'next-intl';
import styles from './SupportMenu.module.scss';
import { usePathname, useRouter } from 'next/navigation';
import { ItemType } from 'antd/es/menu/interface';
import { FaQuestion } from 'react-icons/fa6';
import { TiWarningOutline } from 'react-icons/ti';
import { FaShieldAlt } from 'react-icons/fa';
import { PiTagBold } from 'react-icons/pi';
const SupportMenu = () => {
  const t = useTranslations('support');
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const MENU: NavigationItem[] = [
    {
      key: SUPPORT_PURCHASE,
      label: t('purchase.title'),
      icon: <TiWarningOutline />,
      children: [],
    },
    {
      key: SUPPORT_FAQ,
      label: t('faq.title'),
      icon: <FaQuestion />,
      children: [],
    },
    {
      key: SUPPORT_PRIVACY,
      label: t('privacy.title'),
      icon: <FaShieldAlt />,
      children: [],
    },
    {
      key: SUPPORT_USAGE,
      label: t('usage.title'),
      icon: <PiTagBold />,
      children: [],
    },
  ];

  const handleNavigate = (e: ItemType) => {
    router.push(`/${locale}/${e?.key}`);
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

export default SupportMenu;
