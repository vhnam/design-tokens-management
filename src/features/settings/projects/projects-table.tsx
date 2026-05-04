import type { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import type { Project } from '@/types/project';

import { useProjectStore } from '@/stores/project.store';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

export type TableCell = {
  row: Row<Project>;
};

export const NameCell = ({ row }: TableCell) => {
  return <>{row.original.name}</>;
};

export const ImageCell = ({ row }: TableCell) => {
  return (
    <Avatar>
      <AvatarImage src={row.original.image} alt={row.original.name} />
      <AvatarFallback>{row.original.name.charAt(0)}</AvatarFallback>
    </Avatar>
  );
};

export const ActionsCell = ({ row }: TableCell) => {
  const { activeProject, openEditDialog, openRemoveDialog } = useProjectStore();

  const handleEdit = () => {
    openEditDialog(row.original);
  };

  const handleRemove = () => {
    openRemoveDialog(row.original);
  };

  return (
    <div className="flex items-center justify-end gap-2 py-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="secondary" size="icon" onClick={handleEdit}>
              <PencilIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <span tabIndex={-1}>
              <Button
                variant="destructive"
                size="icon"
                onClick={handleRemove}
                disabled={activeProject?.id === row.original.id}
              >
                <TrashIcon className="size-4" />
              </Button>
            </span>
          }
        />
        <TooltipContent>
          {activeProject?.id === row.original.id ? 'Cannot delete active project' : 'Delete'}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
