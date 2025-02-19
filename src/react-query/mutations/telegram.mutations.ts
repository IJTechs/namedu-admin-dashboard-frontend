import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
import { createTelegram, updateTelegram, deleteTelegram } from '@/requests/telegram.requests';
import {
  ICreateTelegramResponse,
  ICreateTelegramRequest,
  IUpdateTelegramResponse,
  IUpdateTelegramRequest,
  IDeleteTelegramResponse,
} from '@/utils/interfaces/telegram.interface';
import { Toastify } from '@/utils/toastify';

// Create Telegram Mutation
export const useCreateTelegramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<ICreateTelegramResponse, Error, ICreateTelegramRequest>({
    mutationFn: createTelegram,
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.TELEGRAM.ALL, QUERY_KEYS.ADMIN.ALL] });
    },
  });
};

// Update Telegram Mutation
export const useUpdateTelegramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IUpdateTelegramResponse, Error, { telegramId: string; data: IUpdateTelegramRequest }>({
    mutationFn: ({ telegramId, data }) => updateTelegram(telegramId, data),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.TELEGRAM.ALL] });
    },
  });
};

// Delete Telegram Mutation
export const useDeleteTelegramMutation = () => {
  const queryClient = useQueryClient();
  return useMutation<IDeleteTelegramResponse, Error, string>({
    mutationFn: deleteTelegram,
    onSuccess: () => {
      Toastify({ variant: 'success', message: 'Telegram muvaffaqiyatli o`chirildi' });
      queryClient.refetchQueries({ queryKey: [QUERY_KEYS.TELEGRAM.ALL, QUERY_KEYS.ADMIN.ALL] });
    },
  });
};
