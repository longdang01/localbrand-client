import CollectionDetail from '@/pages/collection/components/detail/CollectionDetail';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

interface Props {
  params: {
    path: string;
  };
}

export default function CollectionPage({ params }: Props) {
  const t = useTranslations('collection');
  const { path } = params;

  const COLLECTION_DETAIL_BREADCRUMB = [
    {
      title: <span>{t('title_detail')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={COLLECTION_DETAIL_BREADCRUMB} />

      <CollectionDetail path={path} />
    </>
  );
}
