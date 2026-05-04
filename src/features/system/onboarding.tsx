import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';
import slugify from 'slugify';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

import { organizationSchema } from '@/schemas/organization.schema';
import type { OrganizationSchemaType } from '@/schemas/organization.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { LottiePlayer } from '@/components/primitives/lottie-player';

import { InputField } from '@/components/composites/field/input-field';

const Onboarding = () => {
  const navigate = useNavigate();
  const { data: organizations, isPending } = authClient.useListOrganizations();

  useEffect(() => {
    if (!isPending && organizations && organizations.length > 0) {
      navigate({ to: '/', replace: true });
    }
  }, [organizations, navigate, isPending]);

  const form = useForm<OrganizationSchemaType>({
    resolver: zodResolver(organizationSchema as never) as never,
    defaultValues: {
      organizationName: '',
      organizationSlug: '',
    },
  });

  const slug = useWatch({ control: form.control, name: 'organizationSlug' });

  const handleUpdateSlug = (value: string) => {
    if (!slug) {
      const newSlug = slugify(value, { lower: true, strict: true, locale: 'en' });
      form.setValue('organizationSlug', newSlug);
    }
  };

  const handleSubmit = async (value: OrganizationSchemaType) => {
    const { error } = await authClient.organization.create({
      name: value.organizationName.trim(),
      slug: value.organizationSlug.trim(),
      keepCurrentActiveOrganization: false,
    });

    if (error) {
      toast.error(error.message ?? 'Something went wrong');
      return;
    }

    await navigate({ to: '/settings/projects', replace: true });
    toast.success('Organization created successfully');
  };

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LottiePlayer src="/animations/loading.lottie" className="size-40" />
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Onboarding</CardTitle>
          <CardDescription>Create your first organization</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <div className="flex flex-col gap-6">
              <InputField
                control={form.control}
                name="organizationName"
                label="Name"
                type="text"
                placeholder="My Organization"
                autoComplete="organization-name"
                onBlur={(e) => handleUpdateSlug(e.target.value)}
              />
              <InputField
                control={form.control}
                name="organizationSlug"
                label="Slug"
                type="text"
                placeholder="my-organization"
                autoComplete="organization-slug"
              />
            </div>
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating organization...' : 'Create organization'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
