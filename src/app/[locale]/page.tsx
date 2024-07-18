import BestSeller from '@/components/home/best-seller/BestSeller';
import Sale from '@/components/home/sale/Sale';
import Slide from '@/components/home/slide/Slide';
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
