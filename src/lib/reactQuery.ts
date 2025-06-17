import { QueryClient } from '@tanstack/react-query';

// Create a client
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // Data dianggap stale setelah 1 menit
      refetchOnWindowFocus: false, // Tidak refetch saat window focus
      retry: 1, // Coba ulang 1x jika gagal
    }
  }
})