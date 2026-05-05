import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth';

import { forgotPasswordSchema } from '@/schemas/forgot-password.schema';
import type { ForgotPasswordSchemaType } from '@/schemas/forgot-password.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';

import { InputField } from '@/components/composites/field/input-field';

export const ForgotPassword = () => {
  const navigate = useNavigate();

  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema as never) as never,
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (value: ForgotPasswordSchemaType) => {
    const { error } = await authClient.requestPasswordReset({
      email: value.email.trim(),
    });

    if (error) {
      if (error.status >= 500) {
        toast.error('Unable to process your request right now. Please try again.');
        return;
      }
    }

    await navigate({ to: '/auth/forgot-password-success', replace: true });
    toast.success('If an account exists for that email, a reset link has been sent.');
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Forgot password</CardTitle>
          <CardDescription>Enter your email to receive the new password reset link</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField
              control={form.control}
              name="email"
              label="Email"
              type="email"
              placeholder="john.doe@example.com"
              autoComplete="email"
            />
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Sending...' : 'Send password reset link'}
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                className="w-full"
                render={<Link to="/auth/login">Back to Login</Link>}
              />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
