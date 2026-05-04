import { useNavigate } from '@tanstack/react-router';
import { BriefcaseIcon, MoreVerticalIcon, PlusIcon } from 'lucide-react';

import { fromNow } from '@/lib/daytime';

import type { Project } from '@/types/project';

import { useProjectStore } from '@/stores/project.store';

import { Button } from '@/components/primitives/button';
import { Card, CardAction, CardDescription, CardHeader, CardTitle } from '@/components/primitives/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/primitives/dropdown-menu';

import { ProjectAddDialog } from './project-add-dialog';
import { ProjectDeleteDialog } from './project-delete-dialog';
import { ProjectEditDialog } from './project-edit-dialog';
import { useGetProjects } from './projects.actions';

export const Projects = () => {
  const navigate = useNavigate();
  const { data, isPending, error } = useGetProjects();
  const { openAddDialog, openDeleteDialog, openEditDialog } = useProjectStore();

  const handleSelectProject = async (project: Project) => {
    await navigate({
      to: '/app/$projectId',
      params: { projectId: project.id },
    });
  };

  if (isPending) return <div className="flex items-center justify-center h-full">Loading…</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Projects</h1>
          <p className="text-sm text-muted-foreground">Manage your projects</p>
        </div>
        <Button type="button" onClick={openAddDialog}>
          <PlusIcon className="size-4" />
          Add project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.length === 0 && (
          <div className="col-span-full text-center text-sm text-muted-foreground h-[calc(100vh/2)] flex items-center justify-center">
            No projects found
          </div>
        )}
        {data?.map((project: Project) => (
          <Card key={project.id} className="pt-0" onDoubleClick={() => handleSelectProject(project)}>
            <div className="relative z-20 aspect-video w-full object-cover bg-black/35 flex items-center justify-center">
              <BriefcaseIcon className="size-10 text-muted-foreground" />
            </div>
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{fromNow(project.updatedAt)}</CardDescription>
              <CardAction>
                <DropdownMenu>
                  <DropdownMenuTrigger
                    render={
                      <Button type="button" variant="ghost" size="icon">
                        <MoreVerticalIcon size={20} />
                      </Button>
                    }
                  />
                  <DropdownMenuContent className="w-fit">
                    <DropdownMenuItem>Open file in new tab</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => openEditDialog(project)}>Edit</DropdownMenuItem>
                    <DropdownMenuItem>Duplicate</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => openDeleteDialog(project)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardAction>
            </CardHeader>
          </Card>
        ))}
      </div>

      <ProjectAddDialog />
      <ProjectEditDialog />
      <ProjectDeleteDialog />
    </div>
  );
};
