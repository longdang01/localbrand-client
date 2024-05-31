import { VscThreeBars } from 'react-icons/vsc';
import styles from './Mobile.module.scss';
import { Button, Drawer, Menu } from 'antd';
import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { ITEMS_DROPDOWN } from '../header/constants/Header.constants';

const MobileDrawer = () => {
  const t = useTranslations('header');
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        shape="circle"
        icon={<VscThreeBars />}
        className={styles.btnBar}
        onClick={showDrawer}
      />
      <Drawer title={t('mobile.title')} onClose={onClose} open={open}>
        <Menu onClick={() => {}} mode="inline" items={ITEMS_DROPDOWN} />
      </Drawer>
    </>
  );
};

export default MobileDrawer;
