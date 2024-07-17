import { NAME } from '@/constants/config';
import ProductDetail from '@/pages/product/detail/ProductDetail';
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
    title: `${t('product.title_detail')} | ${NAME}`,
  };
}

export default function ProductDetailPage({ params }: Props) {
  const t = useTranslations('product');
  const { path } = params;

  return (
    <>
      <ProductDetail path={path} />
    </>
  );
}
