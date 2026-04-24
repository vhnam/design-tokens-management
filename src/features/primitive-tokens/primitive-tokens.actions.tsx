import {
  useCreatePrimitiveTokenMutation,
  useDeletePrimitiveTokenMutation,
  useGetPrimitiveTokensQuery,
  useUpdatePrimitiveTokenMutation,
} from '@/queries/primitive-tokens';

import { useWorkspaceStore } from '@/stores/workspace.store';

export const useGetPrimitiveTokens = () => {
  const { activeWorkspace } = useWorkspaceStore();
  return useGetPrimitiveTokensQuery(activeWorkspace?.id);
};

export const useCreatePrimitiveToken = () => {
  return useCreatePrimitiveTokenMutation();
};

export const useUpdatePrimitiveToken = () => {
  return useUpdatePrimitiveTokenMutation();
};

export const useDeletePrimitiveToken = () => {
  return useDeletePrimitiveTokenMutation();
};
