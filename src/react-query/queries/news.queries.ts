import { useQuery } from '@tanstack/react-query';

import { QUERY_KEYS } from '@/utils/constants/query-keys';

import { fetchAllNews, fetchNewsById } from '@/requests/news.requests';

import { INews, INewsData } from '@utils/interfaces/news.interface';

// Fetch all news
export const useNewsQuery = () => {
  return useQuery<INews[], Error>({
    queryKey: [QUERY_KEYS.NEWS.ALL],
    queryFn: fetchAllNews,
  });
};

// Fetch a single news by ID
export const useNewsByIdQuery = (newsId: string) => {
  return useQuery<INewsData, Error>({
    queryKey: [QUERY_KEYS.NEWS.DETAILS(newsId)],
    queryFn: () => fetchNewsById(newsId),
  });
};
