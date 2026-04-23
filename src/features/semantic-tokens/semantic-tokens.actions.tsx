import {
  useCreateSemanticTokenMutation,
  useDeleteSemanticTokenMutation,
  useGetSemanticTokensQuery,
  useUpdateSemanticTokenMutation,
} from '@/queries/semantic-tokens';

export const useGetSemanticTokens = () => {
  return useGetSemanticTokensQuery();
};

export const useCreateSemanticToken = () => {
  return useCreateSemanticTokenMutation();
};

export const useUpdateSemanticToken = () => {
  return useUpdateSemanticTokenMutation();
};

export const useDeleteSemanticTokens = () => {
  return useDeleteSemanticTokenMutation();
};
