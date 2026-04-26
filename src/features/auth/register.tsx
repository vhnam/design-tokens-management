import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

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

  const onSubmit = form.handleSubmit(async (value) => {
    const { error } = await authClient.signUp.email({
      name: value.name.trim(),
      email: value.email.trim(),
      password: value.password,
    });

    if (error) {
      toast.error(error.message ?? 'Unable to create account. Please try again.');
      return;
    }

    await navigate({ to: '/' });
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
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
                  render={<Link to="/auth/login">Login</Link>}
                />
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
