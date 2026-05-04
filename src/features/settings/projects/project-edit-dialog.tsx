import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { projectSchema } from '@/schemas/project.schema';
import type { ProjectSchemaType } from '@/schemas/project.schema';

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

import { InputField } from '@/components/composites/field/input-field';

import { useUpdateProject } from './projects.actions';

export const ProjectEditDialog = () => {
  const editProject = useUpdateProject();
  const { isOpenEditDialog, selectedProject, closeEditDialog } = useProjectStore();

  const form = useForm<ProjectSchemaType>({
    resolver: zodResolver(projectSchema as never) as never,
    defaultValues: {
      projectName: '',
    },
  });

  useEffect(() => {
    if (selectedProject) {
      form.reset({
        projectName: selectedProject.name,
      });
    }
  }, [form, selectedProject]);

  const onSubmit = form.handleSubmit((value) => {
    if (!selectedProject) {
      toast.error('No project selected');
      return;
    }

    editProject.mutate(
      {
        id: selectedProject.id,
        name: value.projectName.trim(),
      },
      {
        onSuccess: () => {
          form.reset();
          closeEditDialog();
          toast.success('Project edited successfully');
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
          <DialogTitle>Edit project</DialogTitle>
          <DialogDescription>Edit the selected project</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <InputField control={form.control} name="projectName" label="Name" placeholder="e.g. My Project" />

          <DialogFooter>
            <DialogClose
              onClick={closeEditDialog}
              render={
                <Button type="button" variant="outline" disabled={editProject.isPending}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={form.formState.isSubmitting || editProject.isPending}>
              {form.formState.isSubmitting || editProject.isPending ? 'Saving…' : 'Edit project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
