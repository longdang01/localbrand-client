'use client';

import { queryClient } from '@/lib/react-query';
import { useColorState } from '@/stores/color.store';
import { ConfigProvider } from 'antd';
import { QueryClientProvider } from 'react-query';

interface Props {
  children: React.ReactNode;
}

export default function AppProvider({ children }: Props) {
  const { themeColor } = useColorState();

  return (
    <QueryClientProvider client={queryClient}>
      <ConfigProvider theme={themeColor}>{children}</ConfigProvider>
    </QueryClientProvider>
  );
}
