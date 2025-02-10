import { AxiosResponse } from 'axios';
import API from '@/utils/api/axios.instance';
import { API_URLS } from '@/utils/constants/api-urls';
import {
  IAdminResponse,
  IAdminsResponse,
  ICreateAdminRequest,
  ICreateAdminResponse,
  IUpdateAdminResponse,
  IChangePasswordRequest,
  IChangePasswordResponse,
  IDeleteAdminResponse,
  IUpdateAdminRequest,
  IAdminRoleControlResponse,
  IAdminStatusControlResponse,
} from '@/utils/interfaces/admin.interface';

// Fetch all admis
export const fetchAllAdmins = async (): Promise<IAdminsResponse> => {
  const response: AxiosResponse<IAdminsResponse> = await API.get(API_URLS.ADMIN.BASE);
  return response.data;
};

// Fetch a single admin by ID
export const fetchAdminById = async (adminId: string): Promise<IAdminResponse> => {
  const response: AxiosResponse<IAdminResponse> = await API.get<IAdminResponse>(API_URLS.ADMIN.GET_BY_ID(adminId));
  return response.data;
};

// Create a new admin
export const createAdmin = async (data: ICreateAdminRequest): Promise<ICreateAdminResponse> => {
  const response = await API.post<ICreateAdminResponse>(API_URLS.ADMIN.CREATE, data);
  return response.data;
};

// Update an existing admin
export const updateAdmin = async (adminId: string, data: IUpdateAdminRequest): Promise<IUpdateAdminResponse> => {
  const response = await API.put<IUpdateAdminResponse>(API_URLS.ADMIN.UPDATE(adminId), data);
  return response.data;
};

// Delete an admin
export const deleteAdmin = async (adminId: string): Promise<IDeleteAdminResponse> => {
  const response = await API.delete<IDeleteAdminResponse>(API_URLS.ADMIN.DELETE(adminId));
  return response.data;
};

// Change admin password
export const changeAdminPassword = async (formData: IChangePasswordRequest): Promise<IChangePasswordResponse> => {
  const response = await API.post<IChangePasswordResponse>(API_URLS.ADMIN.CHANGE_PASSWORD, formData);
  return response.data;
};

//  Change admin status (Activate/Deactivate)
export const changeAdminStatus = async (adminId: string, isActive: boolean): Promise<IAdminStatusControlResponse> => {
  const response = await API.patch<IAdminStatusControlResponse>(API_URLS.ADMIN.CHANGE_STATUS(adminId), { isActive });
  return response.data;
};

//  Change admin role (Super Admin / Admin)
export const changeAdminRole = async (
  adminId: string,
  role: 'SUPER_ADMIN' | 'ADMIN'
): Promise<IAdminRoleControlResponse> => {
  const response = await API.patch<IAdminRoleControlResponse>(API_URLS.ADMIN.CHANGE_ROLE(adminId), { role });
  return response.data;
};
