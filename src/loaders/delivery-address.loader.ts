import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from '@/lib/react-query';
import {
  create,
  getById,
  remove,
  search,
  update,
} from '@/services/delivery-address.service';
import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const CACHE_DELIVERY_ADDRESS = {
  SEARCH: 'SEARCH_DELIVERY_ADDRESS',
  GET_BY_ID: 'GET_BY_ID_DELIVERY_ADDRESS',
  CREATE: 'CREATE_DELIVERY_ADDRESS',
  UPDATE: 'UPDATE_DELIVERY_ADDRESS',
  REMOVE: 'REMOVE_DELIVERY_ADDRESS',
};

export const useSearchDeliveryAddress = ({
  params,
  config,
  enabled,
}: {
  params: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof search>;
  enabled?: boolean;
}) => {
  return useQuery<ExtractFnReturnType<typeof search>>({
    ...config,
    queryKey: [CACHE_DELIVERY_ADDRESS.SEARCH, params],
    queryFn: () => search({ ...params }),
    enabled: enabled,
  });
};

export const useGetByIdDeliveryAddress = ({
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
    queryKey: [CACHE_DELIVERY_ADDRESS.GET_BY_ID, id],
    queryFn: () => getById(id),
    enabled: enabled,
  });
};

export const useCreateDeliveryAddress = ({
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

export const useUpdateDeliveryAddress = ({
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

export const useRemoveDeliveryAddress = ({
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
