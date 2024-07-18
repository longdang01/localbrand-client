import { NAME } from '@/constants/config';
import Category from '@/components/product/category/Category';
import BreadcrumbRender from '@/components/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: {
    category: string;
    flag: string;
  };
}

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('shop.title')} | ${NAME}`,
    description: `${t('shop.description')}`,
  };
}

export default function CategoryPage({ params }: Props) {
  const t = useTranslations('product');
  const { category, flag } = params;

  const CATEGORY_BREADCRUMB = [
    {
      title: <span>{t('title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={CATEGORY_BREADCRUMB} />

      <Category category={category} flag={flag} />
    </>
  );
}
