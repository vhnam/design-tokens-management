import { zodResolver } from '@hookform/resolvers/zod';
import { SaveIcon, UploadIcon } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';

import { profileSchema } from '@/schemas/profile.schema';
import type { ProfileSchemaType } from '@/schemas/profile.schema';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card';
import { Field } from '@/components/primitives/field';

import { InputField } from '@/components/composites/field/input-field';

import AccountAvatarDialog from './account-avatar-dialog';
import { useAccountProfileInformationActions } from './account-profile-information.actions';

const AccountProfileInformation = () => {
  const form = useForm<ProfileSchemaType>({
    resolver: zodResolver(profileSchema as never) as never,
    defaultValues: {
      name: '',
      email: '',
      image: undefined,
    },
  });

  const {
    avatarDialogOpen,
    setAvatarDialogOpen,
    session,
    fallbackName,
    handleFileUpload,
    handleAvatarUrlSubmit,
    onSubmit,
    isSubmitting,
  } = useAccountProfileInformationActions({ form });

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
                          <AvatarImage src={field.value} alt={session?.user.name ?? ''} />
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
            <Button type="submit" disabled={isSubmitting}>
              <SaveIcon />
              {isSubmitting ? 'Saving...' : 'Save changes'}
            </Button>
          </div>
        </form>
      </CardContent>

      <AccountAvatarDialog
        isOpen={avatarDialogOpen}
        onClose={() => setAvatarDialogOpen(false)}
        onSubmit={handleAvatarUrlSubmit}
      />
    </Card>
  );
};

export default AccountProfileInformation;
