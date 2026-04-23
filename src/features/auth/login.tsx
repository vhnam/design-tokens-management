import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

import { loginSchema } from '@/schemas/login.schema';
import type { LoginSchemaType } from '@/schemas/login.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { Separator } from '@/components/primitives/separator';

import { InputField } from '@/components/composites/field/input-field';

export const Login = () => {
  const navigate = useNavigate();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema as never) as never,
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = form.handleSubmit(async (value) => {
    const { error } = await authClient.signIn.email({
      email: value.email.trim(),
      password: value.password,
    });

    if (error) {
      toast.error(error.message ?? 'Unable to login. Please try again.');
      return;
    }

    await navigate({ to: '/' });
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <InputField
                control={form.control}
                name="email"
                label="Email"
                type="email"
                placeholder="john.doe@example.com"
                autoComplete="email"
              />

              <InputField
                control={form.control}
                name="password"
                label="Password"
                type="password"
                placeholder="********"
                autoComplete="current-password"
              />
            </div>
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Logging in...' : 'Login'}
              </Button>
              <Link to="/auth/forgot-password" className="text-accent-foreground underline decoration-dotted">
                Forgot your password?
              </Link>
              <Separator className="my-4 relative !w-[80%] mx-auto">
                <span className="text-muted-foreground absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-background px-2">
                  or
                </span>
              </Separator>
              <div>
                Don't have an account?{' '}
                <Button
                  nativeButton={false}
                  variant="link"
                  className="px-0"
                  render={<Link to="/auth/register">Register</Link>}
                />
              </div>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
