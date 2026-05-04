import { useCallback } from 'react';
import { toast } from 'sonner';

import { useProjectStore } from '@/stores/project.store';

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

import { useDeleteProject } from './projects.actions';

export const ProjectDeleteDialog = () => {
  const deleteProject = useDeleteProject();
  const { isOpenDeleteDialog, selectedProject, closeDeleteDialog } = useProjectStore();

  const handleDelete = useCallback(() => {
    deleteProject.mutate(
      { id: selectedProject!.id },
      {
        onSuccess: () => {
          closeDeleteDialog();
          toast.success('Project deleted successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  }, [selectedProject]);

  return (
    <Dialog open={isOpenDeleteDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Project</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete the selected project{' '}
          <code className="p-1 text-destructive bg-secondary/30">{selectedProject?.name}</code>?
        </DialogDescription>
        <DialogFooter>
          <DialogClose
            onClick={closeDeleteDialog}
            render={
              <Button type="button" variant="outline" disabled={deleteProject.isPending}>
                Cancel
              </Button>
            }
          />
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={deleteProject.isPending}>
            Delete project
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
