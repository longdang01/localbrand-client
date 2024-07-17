import { apiClient } from '@/lib/api';
import { AxiosRequestConfig } from 'axios';

const prefix = 'carts';

export const search = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/search`, request);
  return response.data;
};

