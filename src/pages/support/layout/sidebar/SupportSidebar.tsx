import SupportMenu from '../menu/SupportMenu';
import styles from './SupportSidebar.module.scss';

const SupportSidebar = () => {
  return (
    <>
      <div className={styles.sidebar}>
        <SupportMenu />
      </div>
    </>
  );
};

export default SupportSidebar;
