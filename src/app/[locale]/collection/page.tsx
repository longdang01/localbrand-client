'use client';

import Collection from '@/pages/collection/Collection';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

export default function CollectionPage() {
  const t = useTranslations('collection');

  const COLLECTION_BREADCRUMB = [
    {
      title: <span>{t('title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={COLLECTION_BREADCRUMB} />
      <Collection />
    </>
  );
}
