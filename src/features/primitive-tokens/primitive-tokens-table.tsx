import { TOKEN_TYPE_LABELS } from '@/constants/token';
import type { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { TokenType } from '@/enums/token';

import type { PrimitiveToken } from '@/types/token';

import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';

import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

export type TableCell = {
  row: Row<PrimitiveToken>;
};

export const NameCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.name}</Badge>;
};

export const DotPathCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.dotPath}</Badge>;
};

export const ValueCell = ({ row }: TableCell) => {
  const value = row.original.rawValue ?? '';
  return (
    <div className="flex cursor-default items-center gap-2 py-1">
      {row.original.type === TokenType.Color && value ? (
        <span className="inline-block size-6 shrink-0 rounded border border-border" style={{ backgroundColor: value }}>
          &nbsp;
        </span>
      ) : null}
      {value || '—'}
    </div>
  );
};

export const TypeCell = ({ row }: TableCell) => {
  const t = row.original.type;
  return (
    <span className="flex cursor-default items-center py-1">
      <Badge variant="outline">{t ? TOKEN_TYPE_LABELS[t] : '—'}</Badge>
    </span>
  );
};

export const DescriptionCell = ({ row }: TableCell) => {
  const text = row.original.description;
  return <span className="flex items-center cursor-default py-1 text-muted-foreground">{text || '—'}</span>;
};

export const ActionsCell = ({ row }: TableCell) => {
  const { openEditDialog, openRemoveDialog } = usePrimitiveTokensTableStore();

  const handleEdit = () => {
    openEditDialog(row.original);
  };

  const handleDelete = () => {
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
            <Button variant="destructive" size="icon" onClick={handleDelete}>
              <TrashIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};
