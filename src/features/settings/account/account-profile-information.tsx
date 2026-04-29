import { env } from '@/config/env';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { SaveIcon, UploadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

import { profileSchema } from '@/schemas/profile.schema';
import type { ProfileSchemaType } from '@/schemas/profile.schema';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card';
import { Field } from '@/components/primitives/field';

import { InputField } from '@/components/composites/field/input-field';

import AccountAvatarDialog from './account-avatar-dialog';

async function uploadAvatar(file: File) {
  const ext = file.name.split('.').pop()?.toLowerCase() ?? 'png';

  const { data: presign } = await axios.post<{ uploadUrl: string }>(
    `${env.VITE_API_URL}/users/me/avatar/upload-url`,
    {
      extension: ext,
      contentType: file.type || 'image/png',
    },
    {
      withCredentials: true,
    },
  );

  await axios.put(presign.uploadUrl, file, {
    headers: { 'Content-Type': file.type || 'image/png' },
  });

  const { data: saved } = await axios.patch<{ image: string }>(
    `${env.VITE_API_URL}/users/me/avatar`,
    { extension: ext },
    {
      withCredentials: true,
    },
  );

  return saved.image;
}

const AccountProfileInformation = () => {
  const [avatarDialogOpen, setAvatarDialogOpen] = useState(false);
  const [selectedAvatarFile, setSelectedAvatarFile] = useState<File | null>(null);

  const { data: sessions, refetch: refetchSession } = authClient.useSession();

  const fallbackName = sessions?.user.name
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('');

  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema as never) as never,
    defaultValues: {
      name: sessions?.user.name ?? '',
      email: sessions?.user.email ?? '',
      image: sessions?.user.image ?? undefined,
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedAvatarFile(file);
      form.setValue('image', URL.createObjectURL(file), { shouldDirty: true });
    }
  };

  const onSubmit = async (value: ProfileSchemaType) => {
    let nextImage = value.image?.trim() ?? undefined;

    if (selectedAvatarFile) {
      try {
        nextImage = await uploadAvatar(selectedAvatarFile);
      } catch {
        toast.error('Unable to upload avatar. Please try again.');
        return;
      }
    }

    const { error } = await authClient.updateUser({
      name: value.name.trim(),
      image: nextImage,
    });

    if (error) {
      toast.error(error.message ?? 'Unable to update profile. Please try again.');
      return;
    }

    await refetchSession();
    form.setValue('image', nextImage ?? '');
    setSelectedAvatarFile(null);
    toast.success('Profile updated successfully');
  };

  useEffect(() => {
    return () => {
      if (form.getValues('image')?.startsWith('blob:')) {
        URL.revokeObjectURL(form.getValues('image')!);
      }
    };
  }, [form]);

  useEffect(() => {
    form.reset({
      name: sessions?.user.name ?? '',
      email: sessions?.user.email ?? '',
      image: sessions?.user.image ?? undefined,
    });
  }, [form, sessions?.user.email, sessions?.user.image, sessions?.user.name]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold font-heading">Profile Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Controller
                control={form.control}
                name="image"
                render={({ field }) => (
                  <Field>
                    <div className="flex flex-col items-center">
                      <div className="relative">
                        <Avatar className="size-32">
                          <AvatarImage src={field.value} alt={sessions?.user.name ?? ''} />
                          <AvatarFallback className="bg-accent text-accent-foreground text-3xl">
                            {fallbackName}
                          </AvatarFallback>
                        </Avatar>
                        <label className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                          <UploadIcon className="size-4 text-white" />
                          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                        </label>
                      </div>
                      <Button
                        variant="link"
                        type="button"
                        onClick={() => setAvatarDialogOpen(true)}
                        className="mt-3 text-sm text-blue-600 hover:text-blue-700"
                      >
                        or enter image URL
                      </Button>
                    </div>
                  </Field>
                )}
              />
            </div>
            <div className="space-y-4">
              <InputField control={form.control} name="name" label="Name" placeholder="John Doe" />
              <InputField
                control={form.control}
                name="email"
                label="Email"
                placeholder="john.doe@example.com"
                disabled
              />
            </div>
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              <SaveIcon />
              {form.formState.isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </CardContent>

      <AccountAvatarDialog
        isOpen={avatarDialogOpen}
        onClose={() => setAvatarDialogOpen(false)}
        onSubmit={(avatarUrl) => {
          setSelectedAvatarFile(null);
          form.setValue('image', avatarUrl, { shouldDirty: true });
        }}
      />
    </Card>
  );
};

export default AccountProfileInformation;
