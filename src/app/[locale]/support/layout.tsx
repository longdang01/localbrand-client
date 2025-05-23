import SupportSidebar from '@/components/support/layout/sidebar/SupportSidebar';
import { Col, Row } from 'antd';
import styles from '../../../components/support/layout/SupportLayout.module.scss';
import { useTranslations } from 'next-intl';
import BreadcrumbRender from '@/components/shared/breadcrumb/BreadcrumbRender';

export default function SupportLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const t = useTranslations('support');
  const SUPPORT_BREADCRUMB = [
    {
      title: <span>{t('layout.title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={SUPPORT_BREADCRUMB} />

      <div className={styles.layout}>
        <div className="layout-client">
          <Row gutter={[16, 16]}>
            <Col span={24} md={8} lg={6}>
              <SupportSidebar />
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
