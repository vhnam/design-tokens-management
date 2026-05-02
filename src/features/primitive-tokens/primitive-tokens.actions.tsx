import {
  useCreatePrimitiveTokenMutation,
  useDeletePrimitiveTokenMutation,
  useGetPrimitiveTokensQuery,
  useUpdatePrimitiveTokenMutation,
} from '@/queries/primitive-tokens';

export const useGetPrimitiveTokens = (tokenFileId: string | undefined) => {
  return useGetPrimitiveTokensQuery(tokenFileId);
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
