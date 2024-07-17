
import { NAME } from '@/constants/config';
import CartInfo from '@/pages/cart/cart-info/CartInfo';
import BreadcrumbRender from '@/pages/shared/breadcrumb/BreadcrumbRender';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'metadata',
  });

  return {
    title: `${t('cart.title')} | ${NAME}`,
    description: `${t('cart.description')}`,
  };
}

export default function CartPage() {
  const t = useTranslations('cart');

  const CART_BREADCRUMB = [
    {
      title: <span>{t('title')}</span>,
    },
  ];

  return (
    <>
      <BreadcrumbRender pageBreadcrumbs={CART_BREADCRUMB} />
      <CartInfo />
    </>
  );
}
