import {
  useCreatePrimitiveTokenMutation,
  useDeletePrimitiveTokenMutation,
  useGetPrimitiveTokensQuery,
  useUpdatePrimitiveTokenMutation,
} from '@/queries/primitive-tokens';

export const useGetPrimitiveTokens = () => {
  return useGetPrimitiveTokensQuery();
};

export const useCreatePrimitiveToken = () => {
  return useCreatePrimitiveTokenMutation();
};

export const useUpdatePrimitiveToken = () => {
  return useUpdatePrimitiveTokenMutation();
};

export const useDeletePrimitiveTokens = () => {
  return useDeletePrimitiveTokenMutation();
};
