import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { workspaceSchema } from '@/schemas/workspace.schema';
import type { WorkspaceSchemaType } from '@/schemas/workspace.schema';

import { useWorkspaceStore } from '@/stores/workspace.store';

import { Button } from '@/components/primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/primitives/dialog';

import { CheckboxField } from '@/components/composites/field/checkbox-field';
import { InputField } from '@/components/composites/field/input-field';

import { useUpdateWorkspace } from './workspaces.actions';

const parseStringArray = (value: unknown): string[] => {
  if (Array.isArray(value)) return value.filter((item): item is string => typeof item === 'string');
  if (typeof value !== 'string') return [];

  try {
    const parsed = JSON.parse(value) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === 'string') : [];
  } catch {
    return [];
  }
};

export const WorkspaceEditDialog = () => {
  const updateWorkspace = useUpdateWorkspace();
  const { isOpenEditDialog, selectedWorkspace, closeEditDialog } = useWorkspaceStore();

  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(workspaceSchema as never) as never,
    defaultValues: {
      workspaceName: '',
      workspaceImage: '',
      workspaceThemes: [],
    },
  });

  useEffect(() => {
    if (selectedWorkspace) {
      form.reset({
        workspaceName: selectedWorkspace.name,
        workspaceImage: selectedWorkspace.image,
        workspaceThemes: parseStringArray(selectedWorkspace.themes),
      });
    }
  }, [form, selectedWorkspace]);

  const onSubmit = form.handleSubmit((value) => {
    if (!selectedWorkspace) {
      toast.error('No workspace selected');
      return;
    }

    updateWorkspace.mutate(
      {
        id: selectedWorkspace.id,
        name: value.workspaceName.trim(),
        image: value.workspaceImage?.trim() ?? '',
        brands: ['default'],
        themes: value.workspaceThemes?.map((theme) => theme.trim()) ?? [],
      },
      {
        onSuccess: () => {
          form.reset();
          closeEditDialog();
          toast.success('Workspace updated successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  });

  return (
    <Dialog open={isOpenEditDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Edit workspace</DialogTitle>
          <DialogDescription>Edit the selected workspace</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <InputField control={form.control} name="workspaceName" label="Name" placeholder="e.g. My Workspace" />

          <InputField
            control={form.control}
            name="workspaceImage"
            label="Image"
            optional
            placeholder="e.g. https://example.com/image.png"
          />

          <CheckboxField
            control={form.control}
            name="workspaceThemes"
            label="Themes"
            items={[
              { label: 'Light', value: 'light' },
              { label: 'Dark', value: 'dark' },
            ]}
          />

          <DialogFooter>
            <DialogClose
              onClick={closeEditDialog}
              render={
                <Button type="button" variant="outline" disabled={updateWorkspace.isPending}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={form.formState.isSubmitting || updateWorkspace.isPending}>
              {form.formState.isSubmitting || updateWorkspace.isPending ? 'Saving…' : 'Update workspace'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
