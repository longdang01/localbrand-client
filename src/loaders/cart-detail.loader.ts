import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from '@/lib/react-query';
import { create, getByVariant } from '@/services/cart-detail.service';
import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const CACHE_CART_DETAIL = {
  GET_BY_VARIANT: 'GET_BY_VARIANT',
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
