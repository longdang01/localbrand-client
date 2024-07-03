import DeliveryAddress from '@/pages/account/address/DeliveryAddress';
import { useTranslations } from 'next-intl';

export default function AddressPage() {
  const t = useTranslations('account');

  return (
    <>
      <DeliveryAddress />
    </>
  );
}
