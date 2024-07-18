import { NAME } from '@/constants/config';
import Collection from '@/components/collection/Collection';
import BreadcrumbRender from '@/components/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('collection.title')} | ${NAME}`,
    description: `${t('collection.description')}`,
  };
}

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
