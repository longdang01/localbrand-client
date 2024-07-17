import { Flex, Table, TableColumnsType } from 'antd';
import classes from './table-render.module.scss';
import PaginationRender from '../pagination-render/PaginationRender';
import { useMediaQuery } from '@/utils/responsive';

interface Props {
  columns?: TableColumnsType<any>;
  data?: any[];
  total?: number;
  isCheckBox?: boolean;
  rowKey?: string;
  loading?: boolean;
  pagination?: boolean;
  bordered?: boolean;
  y?: number;
}

const TYPE_SELECT = 'checkbox';

const TableRender = ({
  columns,
  data,
  total,
  isCheckBox = false,
  rowKey = '_id',
  loading,
  pagination = true,
  bordered = true,
  y = 300
}: Props) => {
  const hideGotoRange1 = useMediaQuery(
    `(min-width: 600px) and (max-width: 650px)`,
  );
  const hideGotoRange2 = useMediaQuery(
    `(min-width: 750px) and (max-width: 850px)`,
  );

  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
  };

  return (
    <>
      <div className={classes.tableContainer}>
        <Table
          loading={loading}
          rowSelection={
            isCheckBox
              ? {
                  type: TYPE_SELECT,
                  ...rowSelection,
                }
              : undefined
          }
          columns={columns}
          dataSource={data}
          scroll={{ x: 768, y: y }}
          pagination={false}
          bordered={bordered}
          size="large"
          rowKey={rowKey}
        />
      </div>
      {pagination && (
        <Flex align="center" justify="end">
          <PaginationRender
            total={total}
            showQuickJumper={hideGotoRange1 || hideGotoRange2 ? false : true}
          />
        </Flex>
      )}
    </>
  );
};

export default TableRender;
