import axios from 'axios';

import { api } from '@/integrations/axios';
import { authClient } from '@/integrations/better-auth';

import type { AccountProfile, UpdateAccountProfilePayload, UploadAvatarPayload } from './account-profile.type';

interface PresignedAvatarUploadResponse {
  uploadUrl: string;
}

interface SavedAvatarResponse {
  image: string;
}

const ACCOUNT_PROFILE_ENDPOINT = '/api/users/me';

export const getAccountProfile = async () => {
  const { data: session, error } = await authClient.getSession();

  if (error || !session?.user) {
    throw new Error('Unable to fetch account profile');
  }

  return {
    name: session.user.name,
    email: session.user.email,
    image: session.user.image,
  } satisfies AccountProfile;
};

export const updateAccountProfile = async (payload: UpdateAccountProfilePayload) => {
  const { error } = await authClient.updateUser(payload);

  if (error) {
    throw new Error(error.message ?? 'Unable to update profile');
  }

  return payload;
};

export const uploadAccountAvatar = async ({ file }: UploadAvatarPayload) => {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';
  const contentType = file.type || 'image/png';

  const { data: presignedResponse } = await api.post<PresignedAvatarUploadResponse>(
    `${ACCOUNT_PROFILE_ENDPOINT}/avatar/upload-url`,
    {
      extension: ext,
      contentType,
    },
  );

  await axios.put(presignedResponse.uploadUrl, file, {
    headers: {
      'Content-Type': contentType,
    },
  });

  const { data: savedAvatar } = await api.patch<SavedAvatarResponse>(`${ACCOUNT_PROFILE_ENDPOINT}/avatar`, {
    extension: ext,
  });

  return savedAvatar.image;
};
