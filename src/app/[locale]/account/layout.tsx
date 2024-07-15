import AccountSidebar from '@/pages/account/layout/sidebar/AccountSidebar';
import { Col, Row } from 'antd';
import styles from '../../../pages/account/layout/AccountLayout.module.scss';
import { useTranslations } from 'next-intl';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';

export default function AccountLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('account');
  const ACCOUNT_BREADCRUMB = [
    {
      title: <span>{t('layout.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={ACCOUNT_BREADCRUMB} />

      <div className={styles.layout}>
        <div className="layout-client">
          <Row gutter={[16, 16]}>
            <Col span={24} md={8} lg={6}>
              <AccountSidebar />
            </Col>
            <Col span={24} md={16} lg={18}>
              {children}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
