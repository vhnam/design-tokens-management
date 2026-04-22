import { useForm } from '@tanstack/react-form';
import { Link, createFileRoute, useNavigate } from '@tanstack/react-router';
import { useState } from 'react';

import { authClient } from '@/lib/auth-client';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { Input } from '@/components/primitives/input';
import { Label } from '@/components/primitives/label';

export const Route = createFileRoute('/_public/auth/register')({
  component: RouteComponent,
});

function RouteComponent() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
    onSubmit: async ({ value }) => {
      setErrorMessage(null);

      const { error } = await authClient.signUp.email({
        name: value.name.trim(),
        email: value.email.trim(),
        password: value.password,
      });

      if (error) {
        setErrorMessage(error.message ?? 'Unable to create account. Please try again.');
        return;
      }

      await navigate({ to: '/' });
    },
  });

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>Create an account to get started</CardDescription>
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
                name="name"
                children={(field) => (
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor={field.name}>Name</Label>
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="John Doe"
                      required
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(event) => field.handleChange(event.target.value)}
                    />
                  </div>
                )}
              />
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
                    <Label htmlFor={field.name}>Password</Label>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="password"
                      placeholder="********"
                      required
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
                    {isSubmitting ? 'Registering...' : 'Register'}
                  </Button>
                )}
              />
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
}
