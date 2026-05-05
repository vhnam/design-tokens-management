import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth';

import {
  useGetAccountProfileQuery,
  useUpdateAccountProfileMutation,
  useUploadAccountAvatarMutation,
} from '@/queries/account-profile';

import type { ProfileSchemaType } from '@/schemas/profile.schema';

interface UseAccountProfileInformationActionsParams {
  form: UseFormReturn<ProfileSchemaType>;
}

export const useAccountProfileInformationActions = ({ form }: UseAccountProfileInformationActionsParams) => {
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);
  const { data: session, refetch: refetchSession } = authClient.useSession();

  const profileQuery = useGetAccountProfileQuery({ enabled: !!session?.user });
  const updateAccountProfileMutation = useUpdateAccountProfileMutation();
  const uploadAccountAvatarMutation = useUploadAccountAvatarMutation();

  const name = profileQuery.data?.name ?? session?.user.name ?? '';
  const email = profileQuery.data?.email ?? session?.user.email ?? '';
  const image = profileQuery.data?.image ?? session?.user.image ?? undefined;

  const fallbackName = useMemo(
    () =>
      name
        .split(' ')
        .map((part) => part.charAt(0).toUpperCase())
        .join(''),
    [name],
  );

  useEffect(() => {
    form.reset({
      name,
      email,
      image: image ?? undefined,
    });
  }, [email, form, image, name]);

  useEffect(() => {
    return () => {
      if (form.getValues('image')?.startsWith('blob:')) {
        URL.revokeObjectURL(form.getValues('image')!);
      }
    };
  }, [form]);

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setSelectedAvatarFile(file);
    form.setValue('image', URL.createObjectURL(file), { shouldDirty: true });
  };

  const handleAvatarUrlSubmit = (avatarUrl: string) => {
    setSelectedAvatarFile(null);
    form.setValue('image', avatarUrl, { shouldDirty: true });
  };

  const onSubmit = async (value: ProfileSchemaType) => {
    let nextImage = value.image?.trim() ?? undefined;

    if (selectedAvatarFile) {
      try {
        nextImage = await uploadAccountAvatarMutation.mutateAsync({ file: selectedAvatarFile });
      } catch {
        toast.error('Unable to upload avatar. Please try again.');
        return;
      }
    }

    try {
      await updateAccountProfileMutation.mutateAsync({
        name: value.name.trim(),
        image: nextImage,
      });
    } catch {
      toast.error('Unable to update profile. Please try again.');
      return;
    }

    await refetchSession();
    form.setValue('image', nextImage ?? '');
    setSelectedAvatarFile(null);
    toast.success('Profile updated successfully');
  };

  return {
    avatarDialogOpen,
    setAvatarDialogOpen,
    selectedAvatarFile,
    setSelectedAvatarFile,
    session,
    fallbackName,
    handleFileUpload,
    handleAvatarUrlSubmit,
    onSubmit,
    isSubmitting:
      form.formState.isSubmitting || updateAccountProfileMutation.isPending || uploadAccountAvatarMutation.isPending,
  };
};
