import { AxiosResponse } from 'axios';
import API from '@/utils/api/axios.instance';
import { API_URLS } from '@/utils/constants/api-urls';
import { IAdminLoginData, IAdminResponse, IAdmin } from '@/utils/interfaces/auth.interface';

export const userLogin = async ({ username, password }: IAdminLoginData): Promise<IAdminResponse> => {
  const response: AxiosResponse<IAdminResponse> = await API.post(API_URLS.AUTH.LOGIN, {
    username,
    password,
  });
  return response.data;
};

export const userLogout = async (): Promise<unknown> => {
  return await API.post(API_URLS.AUTH.LOGOUT, {});
};

export const userMe = async (): Promise<IAdmin> => {
  const response: AxiosResponse<IAdminResponse> = await API.get(API_URLS.AUTH.ME);
  return response.data.admin;
};
