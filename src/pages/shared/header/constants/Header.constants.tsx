import { Flex, MenuProps } from 'antd';
import { FaAngleRight } from 'react-icons/fa';

export const PROFILE_DROPDOWN: MenuProps['items'] = [
  {
    key: '1',
    label: 'TOP',
  },
  {
    key: '2',
    label: 'BOTTOM',
    expandIcon: (
      <Flex justify="center" align="center">
        <FaAngleRight />
      </Flex>
    ),
    children: [
      {
        key: '2-1',
        label: 'Trouser',
      },
      {
        key: '2-2',
        label: 'Jeans',
      },
    ],
  },
];

export const ITEMS_DROPDOWN: MenuProps['items'] = [
  {
    key: '1',
    label: 'TOP',
  },
  {
    key: '2',
    label: 'BOTTOM',
    expandIcon: (
      <Flex justify="center" align="center">
        <FaAngleRight />
      </Flex>
    ),
    children: [
      {
        key: '2-1',
        label: 'Trouser',
      },
      {
        key: '2-2',
        label: 'Jeans',
      },
    ],
  },
];
