import { useCallback } from 'react';
import { toast } from 'sonner';

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

import { useDeleteWorkspace } from './workspaces.actions';

export const WorkspaceDeleteDialog = () => {
  const deleteWorkspace = useDeleteWorkspace();
  const { isOpenDeleteDialog, selectedWorkspace, closeDeleteDialog } = useWorkspaceStore();

  const handleDelete = useCallback(() => {
    deleteWorkspace.mutate(
      { id: selectedWorkspace!.id },
      {
        onSuccess: () => {
          closeDeleteDialog();
          toast.success('Workspace deleted successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  }, [selectedWorkspace]);

  return (
    <Dialog open={isOpenDeleteDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Workspace</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete the selected workspace{' '}
          <code className="p-1 text-destructive bg-secondary/30">{selectedWorkspace?.name}</code>?
        </DialogDescription>
        <DialogFooter>
          <DialogClose
            onClick={closeDeleteDialog}
            render={
              <Button type="button" variant="outline" disabled={deleteWorkspace.isPending}>
                Cancel
              </Button>
            }
          />
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={deleteWorkspace.isPending}>
            Delete workspace
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
