import { NAME } from '@/constants/config';
import CollectionDetail from '@/components/collection/components/detail/CollectionDetail';
import BreadcrumbRender from '@/components/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: {
    path: string;
  };
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('collection.title_detail')} | ${NAME}`,
    description: `${t('collection.description_detail')}`,
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
