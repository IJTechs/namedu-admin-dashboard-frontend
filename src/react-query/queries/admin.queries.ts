import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils/constants/query-keys';

import { fetchAllAdmins, fetchAdminById } from '@/requests/admin.requests';

import { IAdminsResponse, IAdminResponse } from '@utils/interfaces/admin.interface';

// Fetch all admins
export const useAdminsQuery = () => {
  return useQuery<IAdminsResponse, Error>({
    queryKey: [QUERY_KEYS.ADMIN.ALL],
    queryFn: fetchAllAdmins,
  });
};
// Fetch a single admin by ID
export const useAdminByIdQuery = (adminId: string) => {
  return useQuery<IAdminResponse, Error>({
    queryKey: [QUERY_KEYS.ADMIN.DETAILS(adminId)],
    queryFn: () => fetchAdminById(adminId),
    enabled: !!adminId,
  });
};
