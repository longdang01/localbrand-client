import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from '@/lib/react-query';
import {
  create,
  getByClient,
  getById,
  getByPath,
  remove,
  search,
  update,
} from '@/services/product.service';
import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const CACHE_PRODUCT = {
  SEARCH: 'SEARCH',
  GET_BY_ID: 'GET_BY_ID',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  REMOVE: 'REMOVE',
  GET_BY_PATH: 'PRODUCT_GET_BY_PATH',
  GET_BY_CLIENT: 'PRODUCT_GET_BY_CLIENT',
};

export const useSearchProducts = ({
  params,
  config,
  enabled
}: {
  params: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof search>;
  enabled?: boolean;
}) => {
  return useQuery<ExtractFnReturnType<typeof search>>({
    ...config,
    queryKey: [CACHE_PRODUCT.SEARCH, params],
    queryFn: () => search({ ...params }),
    enabled: enabled
  });
};

export const useGetByPath = ({
  params,
  config,
  enabled
}: {
  params: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof getByPath>;
  enabled?: boolean;
}) => {
  return useQuery<ExtractFnReturnType<typeof getByPath>>({
    ...config,
    queryKey: [CACHE_PRODUCT.GET_BY_PATH, params],
    queryFn: () => getByPath({ ...params }),
    enabled: enabled
  });
};

export const useGetByClient = ({
  params,
  config,
}: {
  params: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof getByClient>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getByClient>>({
    ...config,
    queryKey: [CACHE_PRODUCT.GET_BY_CLIENT, params],
    queryFn: () => getByClient({ ...params }),
  });
};

export const useGetByIdProduct = ({
  id,
  config,
  enabled,
}: {
  id: string;
  config?: QueryConfig<typeof getById>;
  enabled?: boolean;
}) => {
  return useQuery<ExtractFnReturnType<typeof getById>>({
    ...config,
    queryKey: [CACHE_PRODUCT.GET_BY_ID, id],
    queryFn: () => getById(id),
    enabled: enabled,
  });
};

export const useCreateProduct = ({
  config,
}: {
  config?: MutationConfig<typeof create>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: create,
  });
};

export const useUpdateProduct = ({
  id,
  config,
}: {
  id: string;
  config?: MutationConfig<typeof update>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: (request: any) => update(id, request),
  });
};

export const useRemoveProduct = ({
  config,
}: {
  config?: MutationConfig<typeof remove>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: (id: string) => remove(id),
  });
};
