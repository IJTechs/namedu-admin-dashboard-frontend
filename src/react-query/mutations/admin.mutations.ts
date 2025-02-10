import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
import {
  createAdmin,
  updateAdmin,
  deleteAdmin,
  changeAdminPassword,
  changeAdminStatus,
  changeAdminRole,
} from '@/requests/admin.requests';
import {
  ICreateAdminRequest,
  ICreateAdminResponse,
  IUpdateAdminRequest,
  IUpdateAdminResponse,
  IChangePasswordRequest,
  IChangePasswordResponse,
  IDeleteAdminResponse,
  IAdminRoleControlResponse,
  IAdminStatusControlResponse,
} from '@/utils/interfaces/admin.interface';
import { Toastify } from '@/utils/toastify';

//  Create Admin Mutation
export const useCreateAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ICreateAdminResponse, Error, ICreateAdminRequest>({
    mutationFn: createAdmin,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ADMIN.ALL] });
    },
  });
};

//  Update Admin Mutation
export const useUpdateAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IUpdateAdminResponse, Error, { adminId: string; data: IUpdateAdminRequest }>({
    mutationFn: ({ adminId, data }) => updateAdmin(adminId, data),
    onSuccess: () => {
      Toastify({ variant: 'success', message: "Admin ma'lumotlari yangilandi" });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ADMIN.ALL] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data.message === 'You cannot edit your own account';
      if (errorMessage) {
        Toastify({ variant: 'error', message: 'Siz ozingizni tahrirlay olmaysiz' });
      } else {
        Toastify({ variant: 'error', message: 'Admin ma`lumotlari yangilashda xatolik' });
      }
    },
  });
};

// Delete Admin Mutation
export const useDeleteAdminMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IDeleteAdminResponse, Error, string>({
    mutationFn: deleteAdmin,
    onSuccess: () => {
      Toastify({ variant: 'success', message: 'Admin muvaffaqiyatli o`chirildi' });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ADMIN.ALL] });
    },
    onError: (error: any) => {
      const errorMessage = error?.response?.data.message === 'You cannot delete your own account';
      if (errorMessage) {
        Toastify({ variant: 'error', message: 'Siz ozingizni ochiraolmaysiz' });
      } else {
        Toastify({ variant: 'error', message: 'Admin o`chirishda xatolik' });
      }
    },
  });
};

//  Change Admin Password Mutation
export const useChangeAdminPasswordMutation = () => {
  return useMutation<IChangePasswordResponse, Error, IChangePasswordRequest>({
    mutationFn: changeAdminPassword,
    onSuccess: () => {
      Toastify({ variant: 'success', message: 'Parol muvaffaqiyatli o`zgartirildi' });
    },
  });
};

//  Change Admin Status Mutation
export const useChangeAdminStatusMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IAdminStatusControlResponse, Error, { adminId: string; isActive: boolean }>({
    mutationFn: ({ adminId, isActive }) => changeAdminStatus(adminId, isActive),
    onSuccess: () => {
      Toastify({ variant: 'success', message: 'Admin statusi yangilandi' });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ADMIN.ALL] });
    },
  });
};

//  Change Admin Role Mutation
export const useChangeAdminRoleMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IAdminRoleControlResponse, Error, { adminId: string; role: 'SUPER_ADMIN' | 'ADMIN' }>({
    mutationFn: ({ adminId, role }) => changeAdminRole(adminId, role),
    onSuccess: () => {
      Toastify({ variant: 'success', message: 'Admin roli yangilandi' });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.ADMIN.ALL] });
    },
  });
};
