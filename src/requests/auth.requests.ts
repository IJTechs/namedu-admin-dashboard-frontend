import { AxiosResponse } from 'axios';
import API from '@/utils/api/axios.instance';
import { API_URLS } from '@/utils/constants/api-urls';
import {
  IUserLoginData,
  IUserResponse,
} from '@/utils/interfaces/auth.interface';

export const userLogin = async ({
  username,
  password,
}: IUserLoginData): Promise<IUserResponse> => {
  const response: AxiosResponse<IUserResponse> = await API.post(
    API_URLS.AUTH.LOGIN,
    {
      username,
      password,
    }
  );
  return response.data;
};

export const userLogout = async (): Promise<void> => {
  await API.post(API_URLS.AUTH.LOGOUT, {});
};

export const userMe = async (): Promise<IUserResponse> => {
  const response: AxiosResponse<IUserResponse> = await API.get(
    API_URLS.AUTH.ME
  );
  return response.data;
};
