import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateWorkspaceMutation, useGetWorkspacesQuery } from '@/queries/workspaces';

import { workspaceSchema } from '@/schemas/workspace.schema';
import type { WorkspaceSchemaType } from '@/schemas/workspace.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { LottiePlayer } from '@/components/primitives/lottie-player';

import { InputField } from '@/components/composites/field/input-field';

const Onboarding = () => {
  const navigate = useNavigate();
  const createWorkspace = useCreateWorkspaceMutation();

  const { data: workspaces, isPending } = useGetWorkspacesQuery();

  useEffect(() => {
    if (!isPending && workspaces && workspaces.length > 0) {
      navigate({ to: '/', replace: true });
    }
  }, [workspaces, navigate, isPending]);

  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(workspaceSchema as never) as never,
    defaultValues: {
      workspaceName: '',
      workspaceImage: '',
    },
  });

  const onSubmit = form.handleSubmit(async (value) => {
    createWorkspace.mutate(
      {
        name: value.workspaceName.trim(),
        image: value.workspaceImage?.trim() ?? '',
      },
      {
        onSuccess: async () => {
          await navigate({ to: '/', replace: true });
          toast.success('Workspace created successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  });

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
          <CardDescription>Create your first workspace</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-6">
              <InputField
                control={form.control}
                name="workspaceName"
                label="Workspace Name"
                type="text"
                placeholder="My Workspace"
                autoComplete="workspace-name"
              />
            </div>
            <CardFooter className="mt-6 flex-col gap-2 px-0">
              <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating workspace...' : 'Create workspace'}
              </Button>
            </CardFooter>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Onboarding;
