import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils/constants/query-keys';

import { userLogin, userLogout } from '@/requests/auth.requests';

import {
  IUserResponse,
  IUserLoginData,
} from '@/utils/interfaces/auth.interface';

// User login mutation
export const useUserLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IUserResponse, Error, IUserLoginData>({
    mutationFn: userLogin,
    onSuccess: (data) => {
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER, data.user);
    },
  });
};

// User logout mutation
export const useUserLogoutMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.USER,
      });
    },
  });
};
