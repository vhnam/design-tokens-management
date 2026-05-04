import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { useCreateProjectMutation } from '@/queries/projects';

import { type ProjectSchemaType, projectSchema } from '@/schemas/project.schema';

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

export const ProjectAddDialog = () => {
  const { isOpenAddDialog, closeAddDialog } = useProjectStore();
  const createProject = useCreateProjectMutation();

  const form = useForm<ProjectSchemaType>({
    defaultValues: {
      projectName: '',
      projectImage: '',
    },
    resolver: zodResolver(projectSchema as never) as never,
  });

  const onSubmit = form.handleSubmit((value) => {
    createProject.mutate(
      {
        name: value.projectName.trim(),
        image: value.projectImage?.trim() ?? '',
      },
      {
        onSuccess: () => {
          closeAddDialog();
          form.reset();
          toast.success('Project created successfully');
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
          <DialogTitle>Add project</DialogTitle>
          <DialogDescription>Create a new project</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <InputField control={form.control} name="projectName" label="Name" placeholder="e.g. My Project" />

          <DialogFooter>
            <DialogClose onClick={closeAddDialog} render={<Button type="button" variant="outline" />}>
              Cancel
            </DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting || createProject.isPending}>
              {form.formState.isSubmitting || createProject.isPending ? 'Saving…' : 'Add project'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
