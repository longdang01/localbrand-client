import { Breadcrumb, Button, Flex, Space } from 'antd';
import styles from './Breadcrumb.module.scss';
import { HomeOutlined } from '@ant-design/icons';
import {
  BreadcrumbItemType,
  BreadcrumbSeparatorType,
} from 'antd/es/breadcrumb/Breadcrumb';
// import { BREADCRUMBS } from './constants/Breadcrumb.constants';

interface Props {
  pageBreadcrumbs?:
    | Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[]
    | undefined;
}

const BreadcrumbRender = ({ pageBreadcrumbs }: Props) => {
  return (
    <>
      <div className={styles.breadcrumb}>
        <div className="layout-client">
          <Flex align="center" justify="flex-start" style={{ height: '100%' }}>
            <Space>
              <>
                <Button>
                  <HomeOutlined />
                </Button>
                <span>/</span>
              </>
              <Breadcrumb items={pageBreadcrumbs} />
            </Space>
          </Flex>
        </div>
      </div>
    </>
  );
};

export default BreadcrumbRender;
