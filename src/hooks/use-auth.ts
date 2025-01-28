import { useQuery } from '@tanstack/react-query';
import { userMe } from '@/requests/auth.requests';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
export const useAuth = () => {
  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.USER,
    queryFn: userMe,
    retry: false,
  });

  const isAuthenticated = !!user;

  return { user, isAuthenticated, isLoading, isError };
};
