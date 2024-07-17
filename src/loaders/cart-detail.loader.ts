import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from '@/lib/react-query';
import {
  create,
  getByVariant,
  remove,
  update,
} from '@/services/cart-detail.service';
import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const CACHE_CART_DETAIL = {
  GET_BY_VARIANT: 'GET_BY_VARIANT',
  REMOVE: 'REMOVE_CART_DETAIL',
};

export const useGetByVariant = ({
  params,
  config,
}: {
  params: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof getByVariant>;
}) => {
  return useQuery<ExtractFnReturnType<typeof getByVariant>>({
    ...config,
    queryKey: [CACHE_CART_DETAIL.GET_BY_VARIANT, params],
    queryFn: () => getByVariant({ ...params }),
  });
};

export const useCreateCartDetail = ({
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

export const useUpdateCartDetail = ({
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

export const useRemoveCartDetail = ({
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
