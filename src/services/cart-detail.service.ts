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

export const update = async (id: string, request: CartDetailProps) => {
  const response = await apiClient?.put(`${prefix}/${id}`, request);
  return response.data;
};

export const remove = async (id?: string) => {
  const response = await apiClient?.delete(`${prefix}/${id}`);
  return response.data;
};
