import axios, { AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

import { BASE_URL } from '@/utils/constants/api-urls';

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
      retries: 2,
      retryDelay: axiosRetry.exponentialDelay,
      retryCondition: (error) =>
        error.response?.status === 500 || error.response?.status === 503,
    });
  }

  // GET Method
  async get<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.api.get<T>(endpoint);
  }

  // POST Method
  async post<T>(
    endpoint: string,
    formData: Record<string, unknown> | FormData,
    isMultipart: boolean = false
  ): Promise<AxiosResponse<T>> {
    const headers = isMultipart
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };

    return this.api.post<T>(endpoint, formData, { headers });
  }

  // PATCH Method
  async patch<T>(
    endpoint: string,
    formData: Record<string, unknown> | FormData,
    isMultipart: boolean = false
  ): Promise<AxiosResponse<T>> {
    const headers = isMultipart
      ? { 'Content-Type': 'multipart/form-data' }
      : { 'Content-Type': 'application/json' };

    return this.api.patch<T>(endpoint, formData, { headers });
  }

  // PUT Method
  async put<T>(
    endpoint: string,
    data: Record<string, unknown>
  ): Promise<AxiosResponse<T>> {
    return this.api.put<T>(endpoint, data);
  }

  // DELETE Method
  async delete<T>(endpoint: string): Promise<AxiosResponse<T>> {
    return this.api.delete<T>(endpoint);
  }
}

const API = new RequestWrapper();

export default API;
