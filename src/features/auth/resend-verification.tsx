import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

import { resendVerificationSchema } from '@/schemas/resend-verification.schema';
import type { ResendVerificationSchemaType } from '@/schemas/resend-verification.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';

import { InputField } from '@/components/composites/field/input-field';

export const ResendVerification = () => {
  const navigate = useNavigate();

  const [isEmailSent, setIsEmailSent] = useState(false);

  const form = useForm<ResendVerificationSchemaType>({
    resolver: zodResolver(resendVerificationSchema as never) as never,
    defaultValues: {
      email: '',
    },
  });

  const handleSubmit = async (value: ResendVerificationSchemaType) => {
    const { error } = await authClient.sendVerificationEmail({
      email: value.email.trim(),
    });

    if (error) {
      toast.error(error.message ?? 'Unable to resend verification email. Please try again.');
      return;
    }

    toast.success('Verification email sent. Please check your inbox.');
    form.reset();
    setIsEmailSent(true);
  };

  if (isEmailSent) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Verification email sent</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Please check your inbox for a verification link.</p>
          </CardContent>
          <CardFooter>
            <Button type="button" variant="outline" className="w-full" onClick={() => navigate({ to: '/auth/login' })}>
              Back to login
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Resend verification</CardTitle>
          <CardDescription>Enter your email to receive the new verification link</CardDescription>
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
                {form.formState.isSubmitting ? 'Sending...' : 'Send verification link'}
              </Button>
              <Button
                nativeButton={false}
                variant="outline"
                className="w-full"
                render={<Link to="/auth/login">Back to login</Link>}
              />
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
