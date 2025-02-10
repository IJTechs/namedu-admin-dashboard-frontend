import { AxiosRequestConfig, AxiosResponse } from 'axios';

export interface IAxiosErrorResponse {
  message: string;
}

export interface IAxiosError<T = IAxiosErrorResponse> {
  message: string;
  name: string;
  code?: string;
  config: AxiosRequestConfig;
  request?: XMLHttpRequest;
  response?: AxiosResponse<T>;
  status?: number;
  statusText?: string;
  stack?: string;
}
