'use client';

import {
  ORDERS_FILTER_STATUSES,
  ORDERS_STATUSES,
  PAGE_INDEX,
  PAGE_SIZE,
  SEARCH_DATA,
} from '@/constants/config';
import { useGetMe } from '@/loaders/auth.loader';
import {
  CACHE_ORDER,
  useRemoveOrder,
  useSearchOrdersClient,
  useUpdateClientOrder,
} from '@/loaders/order.loader';
import { OrderProps } from '@/models/order';
import ConfirmRender from '@/components/shared/modal/confirm/ConfirmRender';
import TableRender from '@/components/shared/table-render/TableRender';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  Input,
  Select,
  Space,
  TableColumnsType,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import dayjs from 'dayjs';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import OrdersInfoModal from './components/OrdersInfoModal';
import { queryClient } from '@/lib/react-query';
import { useMediaQuery } from '@/utils/responsive';

const { Search } = Input;

const Orders = () => {
  const t = useTranslations('account');

  const searchParams = useSearchParams();
  const currentUser = useGetMe({});

  const router = useRouter();
  const pathname = usePathname();

  const pageIndex = searchParams?.get(PAGE_INDEX) || '1';
  const pageSize = searchParams?.get(PAGE_SIZE) || '10';
  const searchData = searchParams?.get(SEARCH_DATA) || '';
  const [searchContent, setSearchContent] = useState('');
  const [status, setStatus] = useState<string>('');
  const mobile = useMediaQuery(`(max-width: 768px)`);

  const handleChangeStatus = (e: string) => {
    setStatus(e);
  };

  useEffect(() => {
    const current = new URLSearchParams(searchParams?.toString());

    if (current?.get(SEARCH_DATA)) {
      setSearchContent(String(current?.get(SEARCH_DATA)));
    }
  }, [searchParams]);

  const searchOrders = useSearchOrdersClient({
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchData: searchData,
      customer: currentUser?.data?.customer?._id,
      status: status,
    },
    enabled: !currentUser?.isLoading,
  });

  const [itemDeleted, setItemDeleted] = useState<string>();
  const updateOrder = useUpdateClientOrder({
    id: itemDeleted || '',
    config: {
      onSuccess: (_) => {
        queryClient.invalidateQueries([CACHE_ORDER.SEARCH_CLIENT]);

        notification.success({
          message: t('order.cancel_success'),
        });
      },
      onError: (error: any) => {
        notification.error({
          message: error?.message,
        });
      },
    },
  });

  const handleSearch = (searchData: string) => {
    const current = new URLSearchParams(searchParams?.toString());

    if (searchData) current.set(SEARCH_DATA, searchData);
    else {
      current.delete(SEARCH_DATA);
    }

    current.set(PAGE_INDEX, '1');
    router.push(`${pathname}?${current}`);
    router.refresh();
  };

  const handleDelete = (id: string, orders: any) => {
    updateOrder.mutate({ ...orders, status: 6 });
  };

  const ORDERS_COLUMNS: TableColumnsType<OrderProps> = [
    {
      title: t('order.fields.serial'),
      align: 'center',
      width: 60,
      render: (_, __, index) =>
        (Number(pageIndex) - 1) * Number(pageSize) + index + 1,
    },
    {
      title: t('order.fields.order_code'),
      dataIndex: 'ordersCode',
      render: (code: string) => <Typography.Text>{code}</Typography.Text>,
      sorter: {
        compare: (a: any, b: any) => a?.ordersCode - b?.ordersCode,
      },
    },
    {
      title: t('order.fields.order_date'),
      dataIndex: 'createdAt',
      render: (date: string) => (
        <Typography.Text>{dayjs(date).format('DD/MM/YYYY')}</Typography.Text>
      ),
      sorter: {
        compare: (a: any, b: any) => a?.createdAt - b?.createdAt,
      },
    },
    {
      title: t('order.fields.order_status'),
      dataIndex: 'status',
      render: (_, record: any) => (
        <Typography.Text>
          {ORDERS_STATUSES?.map(
            (status, index) =>
              status.value == record.status && (
                <div
                  key={index}
                  style={{
                    color: status.color,
                  }}
                >
                  ({status.label})
                </div>
              ),
          )}
        </Typography.Text>
      ),
      sorter: {
        compare: (a: any, b: any) => a?.status - b?.status,
      },
    },
    {
      title: t('address.fields.action'),
      width: 150,
      align: 'right',
      fixed: 'right',
      render: (_, record) => {
        return (
          <>
            <Space>
              <OrdersInfoModal code={String(record?.ordersCode)} />
              {record?.status != 6 && (
                <ConfirmRender
                  buttonRender={
                    <Tooltip title={t('order.delete')}>
                      <Button
                        shape="circle"
                        icon={<DeleteOutlined />}
                        className="btn-delete"
                        onClick={() => setItemDeleted(record?._id)}
                      />
                    </Tooltip>
                  }
                  handleConfirm={() => handleDelete(record?._id, record)}
                  content={t('order.confirm_delete')}
                  title={t('order.confirm_delete_title')}
                />
              )}
            </Space>
          </>
        );
      },
    },
    // Table.SELECTION_COLUMN,
  ];

  return (
    <>
      <div className="">
        <Flex align="center" justify="space-between">
          <Select
            options={ORDERS_FILTER_STATUSES}
            style={{ minWidth: mobile ? 200 : 350 }}
            value={status}
            onChange={handleChangeStatus}
          />

          <Search
            placeholder={t('order.search_here')}
            onSearch={handleSearch}
            value={searchContent}
            onChange={(e) => setSearchContent(e?.target?.value)}
            enterButton
            style={{ width: mobile ? 200 : 350 }}
          />
        </Flex>
        <TableRender
          loading={
            searchOrders?.isLoading ||
            searchOrders?.isFetching ||
            currentUser?.isLoading
          }
          columns={ORDERS_COLUMNS}
          data={searchOrders?.data?.orderses}
          total={searchOrders?.data?.total}
          // isCheckBox
        />
      </div>
    </>
  );
};

export default Orders;
