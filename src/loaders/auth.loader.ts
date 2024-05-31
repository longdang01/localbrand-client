import {
  ExtractFnReturnType,
  MutationConfig,
  QueryConfig,
} from '@/lib/react-query';
import {
  changePassword,
  forgotPassword,
  getMe,
  login,
  resetPassword,
  signup,
} from '@/services/user.service';
import { AxiosRequestConfig } from 'axios';
import { useMutation, useQuery } from 'react-query';

export const CACHE_AUTH = {
  AUTH_LOGIN: 'AUTH_LOGIN',
  AUTH_ME: 'AUTH_ME',
};

export const useLogin = ({
  config,
}: {
  config?: MutationConfig<typeof login>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: login,
  });
};

export const useSignup = ({
  config,
}: {
  config?: MutationConfig<typeof signup>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: signup,
  });
};

export const useGetMe = ({
  params,
  config,
  enabled,
}: {
  params?: AxiosRequestConfig['params'];
  config?: QueryConfig<typeof getMe>;
  enabled?: boolean;
}) => {
  return useQuery<ExtractFnReturnType<typeof getMe>>({
    ...config,
    queryKey: [CACHE_AUTH.AUTH_ME, params],
    queryFn: () => getMe(),
    enabled: enabled,
  });
};

export const useChangePassword = ({
  config,
}: {
  config?: MutationConfig<typeof changePassword>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: changePassword,
  });
};

export const useForgotPassword = ({
  config,
}: {
  config?: MutationConfig<typeof forgotPassword>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: forgotPassword,
  });
};

export const useResetPassword = ({
  config,
}: {
  config?: MutationConfig<typeof resetPassword>;
}) => {
  return useMutation({
    onMutate: () => {},
    onError: () => {},
    onSuccess: () => {},
    ...config,
    mutationFn: resetPassword,
  });
};
