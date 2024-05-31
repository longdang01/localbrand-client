import Slide from '@/pages/home/slide/Slide';
import { useTranslations } from 'next-intl';

export default function Home() {
  const t = useTranslations('global');

  return (
    <>
      <Slide />
    </>
  );
}
