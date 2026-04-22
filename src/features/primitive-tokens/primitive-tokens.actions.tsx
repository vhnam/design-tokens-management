import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import type { PrimitiveToken, TokenType } from '@/types/token';

export type CreatePrimitiveTokenInput = {
  name: string;
  value: string;
  type: TokenType;
  description: string;
};

export const usePrimitiveTokensActions = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['primitive-tokens'],
    queryFn: () => fetch('/api/tokens').then((res) => res.json()),
  });

  return {
    data,
    isLoading,
    error,
  };
};

export const useDeletePrimitiveTokens = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (ids: string[]) => {
      const res = await fetch('/api/tokens', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids }),
      });

      if (!res.ok) {
        let message = 'Failed to delete tokens';
        try {
          const err = (await res.json()) as { error?: string };
          if (err.error) message = err.error;
        } catch {
          // ignore
        }
        throw new Error(message);
      }
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['primitive-tokens'] });
    },
  });
};

export type UpdatePrimitiveTokenInput = {
  id: string;
  name?: string;
  value?: string;
  type?: TokenType;
  description?: string | null;
};

export const useUpdatePrimitiveToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: UpdatePrimitiveTokenInput) => {
      const res = await fetch('/api/tokens', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        let message = 'Failed to update token';
        try {
          const err = (await res.json()) as { error?: string };
          if (err.error) message = err.error;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      return res.json() as Promise<PrimitiveToken>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['primitive-tokens'] });
    },
  });
};

export const useCreatePrimitiveToken = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (input: CreatePrimitiveTokenInput) => {
      const res = await fetch('/api/tokens', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input),
      });

      if (!res.ok) {
        let message = 'Failed to create token';
        try {
          const err = (await res.json()) as { error?: string };
          if (err.error) message = err.error;
        } catch {
          // ignore
        }
        throw new Error(message);
      }

      return res.json() as Promise<unknown>;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['primitive-tokens'] });
    },
  });
};
