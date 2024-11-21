'use client';

import {
  ACCESS_TOKEN,
  PAGE_INDEX,
  PAGE_SIZE,
  SEARCH_DATA,
} from '@/constants/config';
import { queryClient } from '@/lib/react-query';
import {
  CACHE_DELIVERY_ADDRESS,
  useRemoveDeliveryAddress,
  useSearchDeliveryAddress,
} from '@/loaders/delivery-address.loader';
import {
  DeliveryAddressProps,
  DistrictProps,
  ProvinceProps,
  WardProps,
} from '@/models/delivery-address';
import TableRender from '@/components/shared/table-render/TableRender';
import { DeleteOutlined } from '@ant-design/icons';
import {
  Button,
  Flex,
  Input,
  Space,
  TableColumnsType,
  Tag,
  Tooltip,
  Typography,
  notification,
} from 'antd';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import CreateDeliveryAddressModal from './create/CreateDeliveryAddressModal';
import { useGetMe } from '@/loaders/auth.loader';
import { REGIONS } from '@/constants/region';
import ConfirmRender from '@/components/shared/modal/confirm/ConfirmRender';
import EditDeliveryAddressModal from './edit/EditDeliveryAddressModal';
import storage from '@/utils/storage';

const { Search } = Input;

const DeliveryAddress = () => {
  const t = useTranslations('account');
  const router = useRouter();
  const pathname = usePathname();

  const currentUser = useGetMe({
    enabled: !!storage.getStorage(ACCESS_TOKEN),
  });

  const searchParams = useSearchParams();
  const pageIndex = searchParams?.get(PAGE_INDEX) || '1';
  const pageSize = searchParams?.get(PAGE_SIZE) || '10';
  const searchData = searchParams?.get(SEARCH_DATA) || '';
  const [searchContent, setSearchContent] = useState('');

  useEffect(() => {
    const current = new URLSearchParams(searchParams?.toString());

    if (current?.get(SEARCH_DATA)) {
      setSearchContent(String(current?.get(SEARCH_DATA)));
    }
  }, [searchParams]);

  const searchAddress = useSearchDeliveryAddress({
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize,
      searchData: searchData,
      customer: currentUser?.data?.customer?._id,
    },
    enabled: !currentUser?.isLoading,
  });

  const getInfoDeliveryAddress = (id: string, type: number) => {
    if (type == 1) {
      const province = REGIONS.find((item) => item.Id == id);
      return province as ProvinceProps;
    }

    if (type == 2) {
      const districts = REGIONS.map((item) => item.Districts).flat(1);
      const district = districts.find((item) => item.Id == id);
      return district as DistrictProps;
    }

    if (type == 3) {
      const districts = REGIONS.map((item) => item.Districts).flat(1);
      const wards = districts.map((item) => item.Wards).flat(1);
      const ward = wards.find((item: any) => item.Id == id);
      return ward as WardProps;
    }
  };

  const deleteAddress = useRemoveDeliveryAddress({
    config: {
      onSuccess: () => {
        queryClient.invalidateQueries([CACHE_DELIVERY_ADDRESS.SEARCH]);

        notification.success({
          message: t('address.delete_success'),
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

  const handleDelete = (id: string) => {
    deleteAddress.mutate(id);
  };

  const DELIVERY_ADDRESS_COLUMNS: TableColumnsType<DeliveryAddressProps> = [
    {
      title: t('address.fields.serial'),
      align: 'center',
      width: 60,
      render: (_, __, index) =>
        (Number(pageIndex) - 1) * Number(pageSize) + index + 1,
    },
    {
      title: t('address.fields.delivery_address_name'),
      dataIndex: 'deliveryAddressName',
      render: (_, record: any) => (
        <>
          <Typography.Text>
            {record.consigneeName},{' ' + record.consigneePhone},{' '}
            {record.country == 1
              ? `${record.deliveryAddressName}, ${
                  getInfoDeliveryAddress(record.province, 1)?.Name
                }, 
                            ${getInfoDeliveryAddress(record.district, 2)?.Name}, 
                            ${getInfoDeliveryAddress(record.ward, 3)?.Name}`
              : record.deliveryAddressName}
          </Typography.Text>
        </>
      ),
      sorter: {
        compare: (a: any, b: any) =>
          a?.deliveryAddressName - b?.deliveryAddressName,
      },
    },
    {
      title: t('address.fields.status'),
      width: 100,
      align: 'center',
      render: (_, record: any) => {
        return (
          <>
            <Tag
              color={record.active == 1 ? 'green' : 'black'}
              style={{ minWidth: 70 }}
            >
              {record.active == 1
                ? t('address.status_default')
                : t('address.status_normal')}
            </Tag>
          </>
        );
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
              <EditDeliveryAddressModal id={record?._id} />

              <ConfirmRender
                buttonRender={
                  <Tooltip title={t('address.delete')}>
                    <Button
                      shape="circle"
                      icon={<DeleteOutlined />}
                      className="btn-delete"
                    />
                  </Tooltip>
                }
                handleConfirm={() => handleDelete(record?._id)}
                content={t('address.confirm_delete')}
                title={t('address.confirm_delete_title')}
              />
            </Space>
          </>
        );
      },
    },
    // Table.SELECTION_COLUMN,
  ];

  return (
    <>
      <div style={{ padding: '5rem 0' }}>
        <div>
          <Flex align="center" justify="space-between">
            <Search
              placeholder={t('address.search_here')}
              onSearch={handleSearch}
              value={searchContent}
              onChange={(e) => setSearchContent(e?.target?.value)}
              enterButton
              style={{ width: 350 }}
            />
            <CreateDeliveryAddressModal />
          </Flex>
          <TableRender
            loading={
              searchAddress?.isLoading ||
              searchAddress?.isFetching ||
              currentUser?.isLoading
            }
            columns={DELIVERY_ADDRESS_COLUMNS}
            data={searchAddress?.data?.deliveryAddresses}
            total={searchAddress?.data?.total}

            // isCheckBox
          />
        </div>
      </div>
    </>
  );
};

export default DeliveryAddress;
