import { apiClient } from '@/lib/api';
import { CartDetailProps } from '@/models/cart-detail';
import { AxiosRequestConfig } from 'axios';

const prefix = 'cartDetails';

export const getByVariant = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/get-by-variant`, request);
  return response.data;
};

export const create = async (request: CartDetailProps) => {
  const response = await apiClient?.post(`${prefix}`, request);
  return response.data;
};
