'use client';

import { Typography } from 'antd';
import { useTranslations } from 'next-intl';

const Usage = () => {
  const t = useTranslations('support');
  return (
    <>
      <div className="layout-content">
        <Typography.Title className="content-title">
          {t('usage.title')}
        </Typography.Title>
        <Typography.Paragraph>{t('usage.content.1')}</Typography.Paragraph>
      </div>
    </>
  );
};

export default Usage;
