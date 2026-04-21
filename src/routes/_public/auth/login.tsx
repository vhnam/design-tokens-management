import { useForm } from '@tanstack/react-form';
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { Input } from '@/components/primitives/input';
import { Label } from '@/components/primitives/label';

export const Route = createFileRoute('/_public/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      const { error } = await authClient.signIn.email({
        email: value.email.trim(),
        password: value.password,
      });

      if (error) {
        setErrorMessage(error.message ?? 'Unable to login. Please try again.');
        return;
      }

      await navigate({ to: '/' });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Login to your account to get started</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              event.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <div className="flex flex-col gap-6">
              <form.Field
                name="email"
                children={(field) => (
                  <div className="grid gap-2">
                    <Label htmlFor={field.name}>Email</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="john.doe@example.com"
                      required
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  </div>
                )}
              />
              <form.Field
                name="password"
                children={(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={field.name}>Password</Label>
                      <Link to="/auth/forgot-password" className="text-accent-foreground underline decoration-dotted">
                        Forgot your password?
                      </Link>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      required
                      placeholder="********"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  </div>
                )}
              />
              {errorMessage ? <p className="text-sm text-destructive">{errorMessage}</p> : null}
            </div>
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <form.Subscribe
                selector={(state) => state.isSubmitting}
                children={(isSubmitting) => (
                  <Button type="submit" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                )}
              />
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
}
