import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';

import { IAdmin } from '@/utils/interfaces/auth.interface';
import { userMe } from '@/requests/auth.requests';

export const useFetchUserMe = () => {
  return useQuery<IAdmin, Error>({
    queryKey: QUERY_KEYS.AUTH.USER,
    queryFn: userMe,
  });
};
