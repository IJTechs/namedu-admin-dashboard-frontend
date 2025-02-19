import { useMutation, useQueryClient } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils/constants/query-keys';

import { userLogin, userLogout } from '@/requests/auth.requests';

import { IAdminResponse, IAdminLoginData } from '@/utils/interfaces/auth.interface';
import { useNavigate } from 'react-router-dom';

// User login mutation
export const useUserLoginMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IAdminResponse, Error, IAdminLoginData>({
    mutationFn: userLogin,
    onSuccess: data => {
      queryClient.setQueryData(QUERY_KEYS.AUTH.USER, data.admin);
    },
  });
};

// User logout mutation
export const useUserLogoutMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  let isLoggingOut = false;

  const {
    mutateAsync: logout,
    isPending,
    isError,
  } = useMutation({
    mutationFn: async () => {
      if (isLoggingOut) return;
      isLoggingOut = true;

      try {
        await userLogout();
      } catch (error) {
        console.error('❌ Logout failed:', error);
      } finally {
        isLoggingOut = false;
      }
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.USER,
      });
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.ADMIN.ALL,
      });

      navigate('/auth/login', { replace: true });
    },
  });

  return { logout, isPending, isError };
};
