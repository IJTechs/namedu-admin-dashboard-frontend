import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
import { createNews, updateNews, deleteNews } from '@/requests/news.requests';
import { INewsData } from '@/utils/interfaces/news.interface';
import { Toastify } from '@/utils/toastify';
import { useNavigate } from 'react-router-dom';

// Create a new news post
export const useCreateNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<INewsData, Error, FormData>({
    mutationFn: newsData => createNews(newsData),
    onSuccess: () => {
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.NEWS.ALL],
      });
    },
  });
};

// Update a news post
export const useUpdateNewsMutation = () => {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  return useMutation<INewsData, Error, { newsId: string; newsData: FormData }>({
    mutationFn: ({ newsId, newsData }) => updateNews(newsId, newsData),
    onSuccess: (_, { newsId }) => {
      Toastify({ variant: 'success', message: 'Yangilik muvaffaqiyatli yangilandi' });
      navigate('/dashboard/news', { replace: true });

      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.NEWS.ALL] });
      queryClient.refetchQueries({ queryKey: QUERY_KEYS.NEWS.DETAILS(newsId) });
    },
    onError: () => {
      throw new Error('Yangilashda xatolik yuz berdi');
    },
  });
};

// Delete a news post
export const useDeleteNewsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<void, Error, string>({
    mutationFn: newsId => deleteNews(newsId),
    onSuccess: () => {
      Toastify({ variant: 'success', message: 'Yangilik muvaffaqiyatli o`chirildi' });
      queryClient.refetchQueries({
        queryKey: [QUERY_KEYS.NEWS.ALL],
      });
    },
  });
};
