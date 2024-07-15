import SubCategory from '@/pages/product/sub-category/SubCategory';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';

interface Props {
  params: {
    subCategory: string;
    category: string;
    flag: string;
  };
}

export default function SubCategoryPage({ params }: Props) {
  const t = useTranslations('product');
  const { subCategory, category, flag } = params;

  const SUB_CATEGORY_BREADCRUMB = [
    {
      title: <span>{t('title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={SUB_CATEGORY_BREADCRUMB} />

      <SubCategory category={category} flag={flag} subCategory={subCategory} />
    </>
  );
}
