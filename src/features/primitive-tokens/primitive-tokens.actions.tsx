import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { toast } from 'sonner';

import { isValidColorValue } from '@/lib/utils';

import type { PrimitiveToken, TokenType } from '@/types/token';

import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';

const TOKEN_TYPE_LIST: TokenType[] = [
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
];

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

export const useCommitEdit = () => {
  const update = useUpdatePrimitiveToken();
  const completeEdit = usePrimitiveTokensTableStore((store) => store.completeEdit);

  return useCallback(() => {
    const editing = usePrimitiveTokensTableStore.getState().editing;
    if (!editing) return;

    const payload: UpdatePrimitiveTokenInput = { id: editing.tokenId };
    switch (editing.columnId) {
      case 'name':
        payload.name = editing.draft.trim();
        break;
      case 'value':
        if (isValidColorValue(editing.draft)) {
          toast.error('Invalid color value');
          return;
        }
        payload.value = editing.draft.trim();
        break;
      case 'type':
        if (!TOKEN_TYPE_LIST.includes(editing.draft as TokenType)) {
          toast.error('Invalid token type');
          return;
        }
        payload.type = editing.draft as TokenType;
        break;
      case 'description':
        payload.description = editing.draft.trim() === '' ? null : editing.draft.trim();
        break;
      default:
        return;
    }

    update.mutate(payload, {
      onSuccess: () => {
        completeEdit();
        toast.success('Token updated');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }, [completeEdit, update]);
};
