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
} from '@/services/category-big.service';
import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const CACHE_CATEGORY_BIG = {
  SEARCH: 'SEARCH',
  GET_BY_ID: 'GET_BY_ID',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  REMOVE: 'REMOVE',
};

export const useSearchCategoriesBig = ({
  params,
  config,
}: {
  params: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof search>;
}) => {
  return useQuery<ExtractFnReturnType<typeof search>>({
    ...config,
    queryKey: [CACHE_CATEGORY_BIG.SEARCH, params],
    queryFn: () => search({ ...params }),
  });
};

export const useGetByIdCategoryBig = ({
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
    queryKey: [CACHE_CATEGORY_BIG.GET_BY_ID, id],
    queryFn: () => getById(id),
    enabled: enabled,
  });
};

export const useCreateCategoryBig = ({
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

export const useUpdateCategoryBig = ({
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

export const useRemoveCategoryBig = ({
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
