import { useQuery, useQueryClient } from '@tanstack/react-query';
import { userMe } from '@/requests/auth.requests';
import { QUERY_KEYS } from '@/utils/constants/query-keys';
import eventBus from '@/utils/event-bus';
import { useEffect, useState } from 'react';

export const useAuth = () => {
  const queryClient = useQueryClient();
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: QUERY_KEYS.AUTH.USER,
    queryFn: userMe,
    retry: false,
    enabled: !isUnauthorized,
  });

  const isAuthenticated = !!user && !isUnauthorized;

  useEffect(() => {
    const handleUnauthorized = () => {
      setIsUnauthorized(true);
      queryClient.removeQueries({
        queryKey: QUERY_KEYS.AUTH.USER,
      });
    };

    eventBus.on('unauthorized', handleUnauthorized);

    return () => {
      eventBus.off('unauthorized', handleUnauthorized);
    };
  }, [queryClient]);

  return { user, isAuthenticated, isLoading, isError };
};
