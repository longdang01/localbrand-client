'use client';

import { List, Typography } from 'antd';
import { useTranslations } from 'next-intl';

const Faq = () => {
  const t = useTranslations('support');
  return (
    <>
      <div className="layout-content">
        <Typography.Title className="content-title">
          {t('faq.title')}
        </Typography.Title>
        <Typography.Paragraph>{t('faq.content.1')}</Typography.Paragraph>
        <List>
          <List.Item>{t('faq.content.list.1')}</List.Item>
        </List>
      </div>
    </>
  );
};

export default Faq;
