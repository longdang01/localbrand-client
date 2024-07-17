import {
  ExtractFnReturnType,
  QueryConfig,
} from '@/lib/react-query';
import { search } from '@/services/cart.service';
import { AxiosRequestConfig } from 'axios';
import { useQuery } from 'react-query';

export const CACHE_CART = {
  SEARCH: 'SEARCH_CART',
};

export const useSearchCarts = ({
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
    queryKey: [CACHE_CART.SEARCH, params],
    queryFn: () => search({ ...params }),
    enabled: enabled,
  });
};
