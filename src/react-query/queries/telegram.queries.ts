import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/utils/constants/query-keys';

import { ITelegramsResponse, ITelegramResponse } from '@/utils/interfaces/telegram.interface';
import { fetchAllTelegrams, fetchTelegramById, fetchTelegramByLinkedAdmin } from '@/requests/telegram.requests';

// Fetch all telegrams
export const useTelegramsQuery = () => {
  return useQuery<ITelegramsResponse, Error>({
    queryKey: [QUERY_KEYS.TELEGRAM.ALL],
    queryFn: fetchAllTelegrams,
  });
};

// Fetch a single telegram by ID
export const useTelegramByIdQuery = (telegramId: string) => {
  return useQuery<ITelegramResponse, Error>({
    queryKey: [QUERY_KEYS.TELEGRAM.DETAILS(telegramId)],
    queryFn: () => fetchTelegramById(telegramId),
    enabled: !!telegramId,
  });
};

// Fetch telegrams by linked admin
export const useTelegramByLinkedAdminQuery = (linked_admin: string) => {
  return useQuery<ITelegramResponse, Error>({
    queryKey: [QUERY_KEYS.TELEGRAM.BY_LINKED_ADMIN(linked_admin)],
    queryFn: () => fetchTelegramByLinkedAdmin(linked_admin),
    enabled: !!linked_admin,
  });
};
