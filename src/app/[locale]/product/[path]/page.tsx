import ProductDetail from '@/pages/product/detail/ProductDetail';
import { useTranslations } from 'next-intl';

interface Props {
  params: {
    path: string;
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
