import { apiClient } from '@/lib/api';
import { StaffProps } from '@/models/staff';
import { AxiosRequestConfig } from 'axios';

const prefix = 'staffs';

export const updateStaff = async (request: StaffProps) => {
  const response = await apiClient?.put(`${prefix}/${request?._id}`, request);
  return response.data;
};

export const search = async (request: AxiosRequestConfig['params']) => {
  const response = await apiClient?.post(`${prefix}/search`, request);
  return response.data;
};

export const getById = async (id: string) => {
  const response = await apiClient?.get(`${prefix}/${id}`);
  return response.data;
};

export const create = async (request: StaffProps) => {
  const response = await apiClient?.post(`users/register`, request);
  return response.data;
};

export const update = async (id: string, request: StaffProps) => {
  const response = await apiClient?.put(`${prefix}/${id}`, request);
  return response.data;
};

export const remove = async (id: string) => {
  const response = await apiClient?.delete(`${prefix}/${id}`);
  return response.data;
};
