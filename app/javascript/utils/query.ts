import { QueryClient } from '@tanstack/react-query';

const FIVE_MINUTES = 5 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: FIVE_MINUTES,
    },
  },
});

export default queryClient;
