import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateWorkspaceMutation } from '@/queries/workspaces';

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

export const WorkspaceAddDialog = () => {
  const { isOpenAddDialog, closeAddDialog } = useWorkspaceStore();
  const createWorkspace = useCreateWorkspaceMutation();

  const form = useForm<WorkspaceSchemaType>({
    defaultValues: {
      workspaceName: '',
      workspaceImage: '',
      // workspaceBrands: [],
      workspaceThemes: [],
    },
    resolver: zodResolver(workspaceSchema as never) as never,
  });

  const onSubmit = form.handleSubmit((value) => {
    createWorkspace.mutate(
      {
        name: value.workspaceName.trim(),
        image: value.workspaceImage?.trim() ?? '',
        brands: ['default'],
        themes: value.workspaceThemes?.map((theme) => theme.trim()) ?? [],
      },
      {
        onSuccess: () => {
          closeAddDialog();
          form.reset();
          toast.success('Workspace created successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  });

  return (
    <Dialog open={isOpenAddDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add workspace</DialogTitle>
          <DialogDescription>Create a new workspace</DialogDescription>
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
            <DialogClose onClick={closeAddDialog} render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting || createWorkspace.isPending}>
              {form.formState.isSubmitting || createWorkspace.isPending ? 'Saving…' : 'Add workspace'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
