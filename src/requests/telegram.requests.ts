import { AxiosResponse } from 'axios';
import API from '@/utils/api/axios.instance';
import { API_URLS } from '@/utils/constants/api-urls';
import {
  ITelegramResponse,
  ITelegramsResponse,
  ICreateTelegramRequest,
  ICreateTelegramResponse,
  IUpdateTelegramRequest,
  IUpdateTelegramResponse,
  IDeleteTelegramResponse,
} from '@/utils/interfaces/telegram.interface';

// Fetch all telegrams
export const fetchAllTelegrams = async (): Promise<ITelegramsResponse> => {
  const response: AxiosResponse<ITelegramsResponse> = await API.get(API_URLS.TELEGRAM.BASE);
  return response.data;
};

// Fetch a single telegram by ID
export const fetchTelegramById = async (telegramId: string): Promise<ITelegramResponse> => {
  const response: AxiosResponse<ITelegramResponse> = await API.get(API_URLS.TELEGRAM.GET_BY_ID(telegramId));
  return response.data;
};

//Fetch telegrams by linked admin
export const fetchTelegramByLinkedAdmin = async (linked_admin: string): Promise<ITelegramResponse> => {
  const response: AxiosResponse<ITelegramResponse> = await API.get(API_URLS.TELEGRAM.BY_LINKED_ADMIN(linked_admin));
  return response.data;
};

// Create a new telegram
export const createTelegram = async (data: ICreateTelegramRequest): Promise<ICreateTelegramResponse> => {
  const response: AxiosResponse<ICreateTelegramResponse> = await API.post(API_URLS.TELEGRAM.CREATE, data);
  return response.data;
};

// Update an existing telegram
export const updateTelegram = async (
  telegramId: string,
  data: IUpdateTelegramRequest
): Promise<IUpdateTelegramResponse> => {
  const response: AxiosResponse<IUpdateTelegramResponse> = await API.put(API_URLS.TELEGRAM.UPDATE(telegramId), data);
  return response.data;
};

// Delete a telegram
export const deleteTelegram = async (telegramId: string): Promise<IDeleteTelegramResponse> => {
  const response: AxiosResponse<IDeleteTelegramResponse> = await API.delete(API_URLS.TELEGRAM.DELETE(telegramId));
  return response.data;
};
