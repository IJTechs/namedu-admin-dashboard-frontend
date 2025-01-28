import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
import { IUserResponse } from '@/utils/interfaces/auth.interface';
import { userMe } from '@/requests/auth.requests';

export const useFetchUser = () => {
  return useQuery<IUserResponse, Error>({
    queryKey: QUERY_KEYS.AUTH.USER,
    queryFn: userMe,
  });
};
