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

import { InputField } from '@/components/composites/field/input-field';

import { useUpdateWorkspace } from './workspaces.actions';

export const WorkspaceEditDialog = () => {
  const updateWorkspace = useUpdateWorkspace();
  const { isOpenEditDialog, selectedWorkspace, closeEditDialog } = useWorkspaceStore();

  const form = useForm<WorkspaceSchemaType>({
    resolver: zodResolver(workspaceSchema as never) as never,
    defaultValues: {
      workspaceName: '',
      workspaceImage: '',
    },
  });

  useEffect(() => {
    if (selectedWorkspace) {
      form.reset({
        workspaceName: selectedWorkspace.name,
        workspaceImage: selectedWorkspace.image,
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
        image: value.workspaceImage?.trim().length ? value.workspaceImage.trim() : undefined,
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
