import Category from '@/pages/product/category/Category';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

interface Props {
  params: {
    category: string;
    flag: string
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
