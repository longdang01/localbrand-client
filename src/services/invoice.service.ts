import { apiClient } from '@/lib/api';
import { InvoiceProps } from '@/models/invoice';
import { AxiosRequestConfig } from 'axios';

const prefix = 'invoices';

export const search = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/search`, request);
  return response.data;
};

export const getById = async (id: string) => {
  const response = await apiClient?.get(`${prefix}/${id}`);
  return response.data;
};

export const getByCode = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/get-by-code`, request);
  return response.data;
};

export const create = async (request: InvoiceProps) => {
  const response = await apiClient?.post(`${prefix}`, request);
  return response.data;
};

export const update = async (id: string, request: InvoiceProps) => {
  const response = await apiClient?.put(`${prefix}/${id}`, request);
  return response.data;
};

export const remove = async (id: string) => {
  const response = await apiClient?.delete(`${prefix}/${id}`);
  return response.data;
};
