import { PAGE_INDEX, PAGE_SIZE } from '@/constants/config';
import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

interface Props {
  current?: number;
  total?: number;
  showQuickJumper?: boolean;
  showSizeChanger?: boolean;
}

const PaginationRender = ({
  total,
  showQuickJumper = true,
  showSizeChanger = true,
}: Props) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleChangePage = (pageIndex: number, pageSize: number) => {
    const current = new URLSearchParams(searchParams?.toString());

    current.set(PAGE_INDEX, String(pageIndex));
    current.set(PAGE_SIZE, String(pageSize));

    router.push(`${pathname}?${current}`);
    router.refresh();
  };

  return (
    <>
      <Pagination
        showQuickJumper={showQuickJumper}
        showSizeChanger={showSizeChanger}
        current={Number(searchParams?.get(PAGE_INDEX)) || 1}
        pageSize={Number(searchParams?.get(PAGE_SIZE)) || 10}
        total={total}
        onChange={handleChangePage}
      />
    </>
  );
};

export default PaginationRender;
