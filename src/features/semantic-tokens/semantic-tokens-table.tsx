import type { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import type { SemanticToken } from '@/types/token';

import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

export type TableCell = {
  row: Row<SemanticToken>;
};

export const SemanticTokenCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.semanticToken}</Badge>;
};

export const PrimitiveTokenCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.primitiveToken.name}</Badge>;
};

export const ValueCell = ({ row }: TableCell) => {
  const value = row.original.primitiveToken.value;
  return (
    <div className="inline-flex cursor-default items-center gap-2 py-1">
      <span className="inline-block size-6 shrink-0 rounded border border-border" style={{ backgroundColor: value }}>
        &nbsp;
      </span>
      {value}
    </div>
  );
};

export const DescriptionCell = ({ row }: TableCell) => {
  const text = row.original.description;
  return <span className="inline-flex items-center cursor-default py-1 text-muted-foreground">{text || '—'}</span>;
};

export const ActionsCell = ({ row: _row }: TableCell) => {
  return (
    <div className="inline-flex items-center gap-2 py-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="secondary" size="icon">
              <PencilIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="destructive" size="icon">
              <TrashIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};
