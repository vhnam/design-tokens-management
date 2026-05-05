import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth';

import { registerSchema } from '@/schemas/register.schema';
import type { RegisterSchemaType } from '@/schemas/register.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';

import { InputField } from '@/components/composites/field/input-field';
import { PasswordField } from '@/components/composites/field/password-field';

export const Register = () => {
  const navigate = useNavigate();

  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema as never) as never,
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (value: RegisterSchemaType) => {
    const { error } = await authClient.signUp.email({
      name: value.name.trim(),
      email: value.email.trim(),
      password: value.password,
    });

    if (error) {
      const errorCode = String((error as { code?: string }).code ?? '').toUpperCase();
      const errorMessage = (error.message ?? '').toLowerCase();
      const isExistingUserError =
        error.status === 409 ||
        errorCode.includes('EXIST') ||
        errorCode.includes('ALREADY') ||
        errorMessage.includes('already exists') ||
        errorMessage.includes('already registered') ||
        errorMessage.includes('user already exists');

      // Server may notify existing users via email; keep UI response generic.
      if (isExistingUserError) {
        await navigate({ to: '/auth/register-success', replace: true });
        return;
      }

      toast.error('Unable to create account. Please try again.');
      return;
    }
    await navigate({ to: '/auth/register-success', replace: true });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-6">
              <InputField
                control={form.control}
                name="name"
                label="Name"
                type="text"
                placeholder="John Doe"
                autoComplete="name"
              />

              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
              />

              <PasswordField
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                autoComplete="new-password"
              />
            </div>
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Registering...' : 'Register'}
              </Button>
              <div>
                Already have an account ?{' '}
                <Button
                  nativeButton={false}
                  variant="link"
                  className="px-0"
                  disabled={form.formState.isSubmitting}
                  render={
                    <Link to="/auth/login" disabled={form.formState.isSubmitting}>
                      Login
                    </Link>
                  }
                />
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
