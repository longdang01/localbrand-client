import BestSeller from '@/pages/home/best-seller/BestSeller';
import Sale from '@/pages/home/sale/Sale';
import Slide from '@/pages/home/slide/Slide';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('global');

  return (
    <>
      <Slide />
      <BestSeller />
      <Sale />
    </>
  );
}
