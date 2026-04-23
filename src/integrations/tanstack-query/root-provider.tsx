import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { PropsWithChildren } from 'react';

type TanstackQueryProviderProps = PropsWithChildren<{
  queryClient: QueryClient;
}>;

export const tanstackQueryClient = new QueryClient();

export default function TanstackQueryProvider({ children, queryClient }: TanstackQueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
