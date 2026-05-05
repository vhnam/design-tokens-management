import { zodResolver } from '@hookform/resolvers/zod';
import { LockIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth';

import { passwordSchema } from '@/schemas/profile.schema';
import type { PasswordSchemaType } from '@/schemas/profile.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/primitives/card';

import { PasswordField } from '@/components/composites/field/password-field';

export const AccountPassword = () => {
  const form = useForm<PasswordSchemaType>({
    resolver: zodResolver(passwordSchema as never) as never,
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (data: PasswordSchemaType) => {
    const { error } = await authClient.changePassword({
      newPassword: data.newPassword,
      currentPassword: data.currentPassword,
      revokeOtherSessions: true,
    });

    if (error) {
      toast.error('Unable to update password. Please try again.');
      return;
    }

    form.reset();
    toast.success('Password updated successfully');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-bold font-heading">Change Password</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className="space-y-4 w-1/2">
            <PasswordField
              control={form.control}
              name="currentPassword"
              label="Current password"
              placeholder="********"
            />
            <PasswordField control={form.control} name="newPassword" label="New password" placeholder="********" />
            <PasswordField
              control={form.control}
              name="confirmPassword"
              label="Confirm password"
              placeholder="********"
            />
            <div className="flex justify-end">
              <Button type="submit" disabled={form.formState.isSubmitting}>
                <LockIcon className="size-4" />
                {form.formState.isSubmitting ? 'Saving...' : 'Update password'}
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
