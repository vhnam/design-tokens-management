import {
  useCreateComponentTokenMutation,
  useDeleteComponentTokenMutation,
  useGetComponentTokensQuery,
  useUpdateComponentTokenMutation,
} from '@/queries/component-tokens';

export const useGetComponentTokens = () => {
  return useGetComponentTokensQuery();
};

export const useCreateComponentToken = () => {
  return useCreateComponentTokenMutation();
};

export const useUpdateComponentToken = () => {
  return useUpdateComponentTokenMutation();
};

export const useDeleteComponentTokens = () => {
  return useDeleteComponentTokenMutation();
};
