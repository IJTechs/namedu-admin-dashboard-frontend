import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
import { createNews, updateNews, deleteNews } from '@/requests/news.requests';
import { INewsData } from '@/utils/interfaces/news.interface';

// Create a new news post
export const useCreateNewsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<INewsData, Error, Partial<INewsData>>({
    mutationFn: (newsData) => createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NEWS.ALL],
      });
    },
  });
};

// Update a news post
export const useUpdateNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<
    INewsData,
    Error,
    { newsId: string; newsData: Partial<INewsData> }
  >({
    mutationFn: ({ newsId, newsData }) => updateNews(newsId, newsData),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NEWS.ALL],
      });
    },
  });
};

// Delete a news post
export const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: (newsId) => deleteNews(newsId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.NEWS.ALL],
      });
    },
  });
};
