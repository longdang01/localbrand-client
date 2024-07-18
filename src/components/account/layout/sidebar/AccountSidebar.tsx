import AccountMenu from '../menu/AccountMenu';
import styles from './AccountSidebar.module.scss';

const AccountSidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <AccountMenu />
      </div>
    </>
  );
};

export default AccountSidebar;
