import { useMutation, useQueryClient } from '@tanstack/react-query';

import { ACCOUNT_PROFILE_KEYS } from './account-profile.key';
import { updateAccountProfile, uploadAccountAvatar } from './account-profile.service';

export const useUpdateAccountProfileMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAccountProfile,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACCOUNT_PROFILE_KEYS.DETAIL });
    },
  });
};

export const useUploadAccountAvatarMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadAccountAvatar,
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ACCOUNT_PROFILE_KEYS.DETAIL });
    },
  });
};
