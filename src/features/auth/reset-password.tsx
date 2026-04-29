import { zodResolver } from '@hookform/resolvers/zod';
import { useLocation, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

import { resetPasswordSchema } from '@/schemas/reset-password.schema';
import type { ResetPasswordSchemaType } from '@/schemas/reset-password.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';

import { PasswordField } from '@/components/composites/field/password-field';

export const ResetPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const search = new URLSearchParams(location.search);
  const token = search.get('token') ?? '';

  const form = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(resetPasswordSchema as never) as never,
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const handleSubmit = async (value: ResetPasswordSchemaType) => {
    const { error } = await authClient.resetPassword({
      newPassword: value.password,
      token,
    });

    if (error) {
      toast.error(error.message ?? 'Unable to reset password. Please try again.');
      return;
    }

    await navigate({ to: '/auth/login', replace: true });
    toast.success('Password reset successfully');
  };

  if (!token) {
    return <div>Invalid token</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Reset password</CardTitle>
          <CardDescription>Enter your new password</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-6">
              <PasswordField
                control={form.control}
                name="password"
                label="New password"
                placeholder="********"
                autoComplete="new-password"
              />
              <PasswordField
                control={form.control}
                name="confirmPassword"
                label="Confirm password"
                placeholder="********"
                autoComplete="new-password"
              />
            </div>
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Resetting...' : 'Reset password'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
