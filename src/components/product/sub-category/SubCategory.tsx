'use client';

import { useGetByClient } from '@/loaders/product.loader';
import styles from './SubCategory.module.scss';
import { Col, Flex, Menu, Pagination, Row, Skeleton, Spin } from 'antd';
import { convertToMenuItems, getItem } from '@/utils/generate-menu';
import { usePathname, useRouter } from 'next/navigation';
import { NavigationItem } from '@/models/sidebar';
import { useLocale } from 'next-intl';
import { ItemType } from 'antd/es/menu/interface';
import ProductCard from '@/components/shared/product/card/ProductCard';
import { PRODUCT_PAGE_SIZE } from '@/constants/config';
import { Fragment, useMemo, useState } from 'react';
import { ProductProps } from '@/models/product';

interface Props {
  subCategory?: string;
  category?: string;
  flag?: string;
}

const SubCategory = ({ subCategory, category, flag }: Props) => {
  const pathname = usePathname();
  const locale = useLocale();
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState<number>(1);

  const getByClient = useGetByClient({
    params: {
      parent: category,
      previous: flag,
      child: subCategory,
    },
  });

  const currentData = useMemo(() => {
    const firstPageIndex =
      (Number(currentPage) - 1) * Number(PRODUCT_PAGE_SIZE);
    const lastPageIndex = Number(firstPageIndex) + Number(PRODUCT_PAGE_SIZE);
    return (
      getByClient?.data?.products &&
      getByClient?.data?.products?.slice(firstPageIndex, lastPageIndex)
    );
  }, [currentPage, getByClient?.isFetching]);

  const MENU: NavigationItem[] = !getByClient?.isLoading
    ? [
        { ...getByClient?.data?.category },
        ...(!getByClient?.isLoading
          ? getByClient?.data?.category?.subCategories
          : []),
      ]?.map((item) => ({
        key: item?.categoryName
          ? `/${locale}/c/${category}`
          : `/${locale}/s/${category}/${item?.path}`,
        label: item?.categoryName || item?.subCategoryName,
        icon: undefined,
        children: [],
      }))
    : [];

  const handleNavigate = (e: ItemType) => {
    router.push(`${e?.key}`);
  };

  return (
    <>
      <div className="ptb-3">
        <div className="layout-client">
          <Row gutter={[24, 24]}>
            <Col span={24} md={8} lg={6}>
              <div className={styles.sidebar}>
                {getByClient?.isLoading ? (
                  <Flex
                    align="center"
                    justify="center"
                    style={{ height: '100%' }}
                  >
                    <Spin />
                  </Flex>
                ) : (
                  <Menu
                    mode="inline"
                    selectedKeys={[`${pathname}`]}
                    onClick={handleNavigate}
                    items={convertToMenuItems(MENU, getItem)}
                  />
                )}
              </div>
            </Col>
            <Col span={24} md={16} lg={18}>
              <div style={{ marginBottom: 50 }}>
                <Row gutter={[24, 50]}>
                  {getByClient?.isLoading
                    ? [...Array(12)]?.map((_, index: number) => (
                        <Col span={24} md={12} lg={8} key={index}>
                          <Fragment>
                            <Skeleton.Image
                              active
                              className={styles.skeletonImage}
                            />
                            <Skeleton.Input
                              active
                              size="small"
                              className={styles.skeletonInput}
                            />
                            <Skeleton.Input
                              active
                              size="small"
                              className={styles.skeletonInput}
                            />
                          </Fragment>
                        </Col>
                      ))
                    : currentData?.map(
                        (product: ProductProps, index: number) => (
                          <Col span={24} md={12} lg={8} key={index}>
                            <ProductCard product={product} />
                          </Col>
                        ),
                      )}
                </Row>
              </div>

              <Pagination
                className="pagination-bar"
                current={currentPage}
                total={getByClient?.data?.products?.length}
                pageSize={PRODUCT_PAGE_SIZE}
                onChange={(page) => setCurrentPage(page)}
              />
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default SubCategory;
