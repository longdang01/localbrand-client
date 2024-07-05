'use client';

import { List, Typography } from 'antd';
import { useTranslations } from 'next-intl';

const Purchase = () => {
  const t = useTranslations('support');
  return (
    <>
      <div className="layout-content">
        <Typography.Title className="content-title">
          {t('purchase.title')}
        </Typography.Title>
        <Typography.Paragraph>{t('purchase.content.1')}</Typography.Paragraph>
        <List>
          <List.Item>{t('purchase.content.list.1')}</List.Item>
          <List.Item>{t('purchase.content.list.2')}</List.Item>
          <List.Item>{t('purchase.content.list.3')}</List.Item>
        </List>
      </div>
    </>
  );
};

export default Purchase;
