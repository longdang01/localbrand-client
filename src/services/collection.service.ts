import { apiClient } from '@/lib/api';
import { CollectionProps } from '@/models/collection';
import { AxiosRequestConfig } from 'axios';

const prefix = 'collections';

export const search = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/search`, request);
  return response.data;
};

export const getById = async (id: string) => {
  const response = await apiClient?.get(`${prefix}/${id}`);
  return response.data;
};

export const getByPath = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/get-by-path`, request);
  return response.data;
};

export const create = async (request: CollectionProps) => {
  const response = await apiClient?.post(`${prefix}`, request);
  return response.data;
};

export const update = async (id: string, request: CollectionProps) => {
  const response = await apiClient?.put(`${prefix}/${id}`, request);
  return response.data;
};

export const remove = async (id: string) => {
  const response = await apiClient?.delete(`${prefix}/${id}`);
  return response.data;
};
