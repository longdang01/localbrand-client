import { NAME } from '@/constants/config';
import SubCategory from '@/pages/product/sub-category/SubCategory';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface Props {
  params: {
    subCategory: string;
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
