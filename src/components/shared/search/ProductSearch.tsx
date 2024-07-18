import { useDisclosure } from '@/utils/modal';
import ModalRender from '../modal/ModalRender';
import styles from './ProductSearch.module.scss';
import {
  Button,
  Col,
  Divider,
  Flex,
  Input,
  List,
  Row,
  Spin,
  Tooltip,
  Typography,
} from 'antd';
import { LoadingOutlined, SearchOutlined } from '@ant-design/icons';
import { useTranslations } from 'next-intl';
import { useMediaQuery } from '@/utils/responsive';
import Link from 'next/link';
import { RiShoppingCartLine } from 'react-icons/ri';
import Item from 'antd/es/list/Item';
import { useState } from 'react';
import { useSearchProducts } from '@/loaders/product.loader';
import { ProductProps } from '@/models/product';
import { CategorySmallProps } from '@/models/category-small';
const { Search } = Input;

const ProductSearch = () => {
  const t = useTranslations('header');
  const { open, close, isOpen } = useDisclosure();
  const mobile = useMediaQuery(`(max-width: 768px)`);
  const [searchContent, setSearchContent] = useState<string>('');

  const searchProducts = useSearchProducts({
    params: {
      searchData: searchContent,
    },
    enabled: isOpen,
  });

  const handleOpen = () => {
    open();
  };

  const handleClose = () => {
    close();
  };

  const handleSearch = (e: string) => {
    setSearchContent(e);
  };

  return (
    <>
      <ModalRender
        customHeader={true}
        title={<Typography.Text>{t('search_title')}</Typography.Text>}
        buttonRender={
          !mobile ? (
            <Input
              addonBefore={<SearchOutlined />}
              placeholder={t('search_here')}
              className={`${styles.searchBar} search-bar`}
              readOnly
              onClick={handleOpen}
            />
          ) : (
            <Tooltip title={t('fields.search')}>
              <Button
                shape="circle"
                icon={<SearchOutlined />}
                className={`${styles.btnSearch} btn-search`}
                onClick={handleOpen}
              />
            </Tooltip>
          )
        }
        open={isOpen}
        hideOkButton
        handleCancel={handleClose}
      >
        <Search
          placeholder={t('search_here')}
          onSearch={handleSearch}
          className={styles.searchInput}
          enterButton
        />

        <Divider />
        {searchContent && (
          <>
            <Flex align="center">
              <Typography.Text>
                {t('search_result')}:{' '}
                {searchContent && searchProducts?.isLoading ? (
                  <LoadingOutlined />
                ) : !searchContent ? (
                  Number(0)
                ) : (
                  searchProducts?.data?.products?.length
                )}{' '}
                {t('product')}
              </Typography.Text>
            </Flex>
            <List>
              {searchProducts?.isLoading ? (
                <Flex justify="center" align="center" style={{ height: 300 }}>
                  <Spin />
                </Flex>
              ) : (
                searchProducts?.data?.products?.map(
                  (product: ProductProps, index: number) => (
                    <Item style={{ display: 'block' }} key={index}>
                      <Row gutter={[20, 20]} className={styles.item}>
                        <Col span={3} md={3} lg={3}>
                          <Flex align="center">
                            <img
                              src={product?.colors?.[0]?.images?.[0].picture}
                              className={styles.image}
                              alt="Image"
                            />
                          </Flex>
                        </Col>
                        <Col span={21} md={21} lg={21}>
                          <Flex
                            justify="space-between"
                            align="center"
                            style={{ height: '100%' }}
                          >
                            <Flex
                              justify="center"
                              style={{ height: '100%' }}
                              vertical
                            >
                              <Link href={'/'} style={{ fontWeight: 'bold' }}>
                                {product.productName}
                              </Link>
                              <Flex>
                                <Typography.Text style={{ color: 'grey' }}>
                                  {
                                    (product?.subCategory as CategorySmallProps)
                                      ?.subCategoryName
                                  }
                                </Typography.Text>
                              </Flex>
                            </Flex>
                            <Button
                              type="primary"
                              icon={<RiShoppingCartLine />}
                            />
                          </Flex>
                        </Col>
                      </Row>
                    </Item>
                  ),
                )
              )}
            </List>
          </>
        )}
      </ModalRender>
    </>
  );
};

export default ProductSearch;
