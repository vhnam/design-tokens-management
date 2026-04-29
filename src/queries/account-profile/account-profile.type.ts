export interface AccountProfile {
  name: string;
  email: string;
  image?: string | null;
}

export interface UpdateAccountProfilePayload {
  name: string;
  image?: string;
}

export interface UploadAvatarPayload {
  file: File;
}
