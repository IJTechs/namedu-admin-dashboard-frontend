import { AxiosResponse } from 'axios';
import API from '@/utils/api/axios.instance';
import { API_URLS } from '@/utils/constants/api-urls';
import { INews, INewsData } from '@/utils/interfaces/news.interface';

// Fetch all news
export const fetchAllNews = async (): Promise<INews> => {
  const response: AxiosResponse<INews> = await API.get(API_URLS.NEWS.BASE);
  return response.data;
};

// Fetch a single news by ID
export const fetchNewsById = async (newsId: string): Promise<INewsData> => {
  const response: AxiosResponse<INewsData> = await API.get(API_URLS.NEWS.GET_BY_ID(newsId));
  return response.data;
};

// Create a new news
export const createNews = async (newsData: FormData): Promise<INewsData> => {
  const response: AxiosResponse<INewsData> = await API.post(API_URLS.NEWS.CREATE, newsData);
  return response.data;
};

// Update an existing news
export const updateNews = async (newsId: string, newsData: FormData): Promise<INewsData> => {
  const response: AxiosResponse<INewsData> = await API.put(API_URLS.NEWS.UPDATE(newsId), newsData);
  return response.data;
};

// Delete a news
export const deleteNews = async (newsId: string): Promise<void> => {
  await API.delete(API_URLS.NEWS.DELETE(newsId));
};
