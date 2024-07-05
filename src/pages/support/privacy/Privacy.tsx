'use client';

import { Typography } from 'antd';
import { useTranslations } from 'next-intl';

const Privacy = () => {
  const t = useTranslations('support');
  return (
    <>
      <div className="layout-content">
        <Typography.Title className="content-title">
          {t('privacy.title')}
        </Typography.Title>
        <Typography.Paragraph>{t('privacy.content.1')}</Typography.Paragraph>
      </div>
    </>
  );
};

export default Privacy;
