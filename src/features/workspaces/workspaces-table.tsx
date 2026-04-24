import type { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import type { Workspace } from '@/types/workspace';

import { useWorkspaceStore } from '@/stores/workspace.store';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/primitives/avatar';
import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

export type TableCell = {
  row: Row<Workspace>;
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

export const BrandsCell = ({ row }: TableCell) => {
  const brands = JSON.parse(row.original.brands as any) as string[];
  return (
    <span className="flex cursor-default items-center py-1">
      {brands.map((brand) => (
        <span key={brand}>{brand}</span>
      ))}
    </span>
  );
};

export const ThemesCell = ({ row }: TableCell) => {
  const themes = JSON.parse(row.original.themes as any) as string[];
  return (
    <span className="flex items-center gap-2 py-1">
      {themes.map((theme) => (
        <Badge variant="outline" key={theme}>
          {theme}
        </Badge>
      ))}
    </span>
  );
};

export const ActionsCell = ({ row }: TableCell) => {
  const { openEditDialog, openRemoveDialog } = useWorkspaceStore();

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
            <Button variant="destructive" size="icon" onClick={handleRemove}>
              <TrashIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};
