import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { BASE_URL } from '@/utils/constants/api-urls';
import { userLogout } from '@/requests/auth.requests';
import eventBus from '../event-bus';
class RequestWrapper {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    axiosRetry(this.api, {
      retries: 1,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: error => error.response?.status === 500 || error.response?.status === 503,
    });

    this.api.interceptors.response.use(
      response => response,
      async (error: AxiosError) => {
        if (error.response?.status === 401) {
          await userLogout();
          eventBus.emit('unauthorized');
        }

        return Promise.reject(error);
      }
    );
  }

  // GET Method
  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.api.get<T>(endpoint);
  }

  // POST Method
  async post<T, U extends object | FormData = object>(
    endpoint: string,
    data: U,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = {
      ...(data instanceof FormData
        ? {
            'Content-Type': 'multipart/form-data',
          }
        : { 'Content-Type': 'application/json' }),
      ...config.headers,
    };

    return this.api.post<T>(endpoint, data, { ...config, headers });
  }

  // PATCH Method
  async patch<T, U extends object | FormData = object>(
    endpoint: string,
    data: U,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = {
      ...(data instanceof FormData
        ? {
            'Content-Type': 'multipart/form-data',
          }
        : { 'Content-Type': 'application/json' }),
      ...config.headers,
    };

    return this.api.patch<T>(endpoint, data, { ...config, headers });
  }

  // PUT Method
  async put<T, U extends object | FormData = object>(
    endpoint: string,
    data: U,
    config: Partial<AxiosRequestConfig> = {}
  ): Promise<AxiosResponse<T>> {
    const headers = {
      ...(data instanceof FormData
        ? {
            'Content-Type': 'multipart/form-data',
          }
        : { 'Content-Type': 'application/json' }),
      ...config.headers,
    };

    return this.api.put<T>(endpoint, data, { ...config, headers });
  }

  // DELETE Method
  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(endpoint);
  }
}

const API = new RequestWrapper();

export default API;
