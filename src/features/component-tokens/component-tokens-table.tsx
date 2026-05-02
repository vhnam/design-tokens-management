import type { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import type { ComponentToken } from '@/types/token';

import { TokenType } from '@/enums/token';

import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

export type TableCell = {
  row: Row<ComponentToken>;
};

export const ComponentTokenCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.componentToken}</Badge>;
};

export const SemanticTokenCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.semanticToken.semanticToken}</Badge>;
};

export const PrimitiveTokenCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.semanticToken.primitiveToken.dotPath}</Badge>;
};

export const ValueCell = ({ row }: TableCell) => {
  const primitive = row.original.semanticToken.primitiveToken;
  const value = primitive.rawValue ?? '';
  const showSwatch = primitive.type === TokenType.Color && Boolean(value);
  return (
    <div className="inline-flex cursor-default items-center gap-2 py-1">
      {showSwatch ? (
        <span className="inline-block size-6 shrink-0 rounded border border-border" style={{ backgroundColor: value }}>
          &nbsp;
        </span>
      ) : null}
      {value || '—'}
    </div>
  );
};

export const DescriptionCell = ({ row }: TableCell) => {
  const text = row.original.description;
  return <span className="inline-flex items-center cursor-default py-1 text-muted-foreground">{text || '—'}</span>;
};

export const ActionsCell = (_props: TableCell) => {
  return (
    <div className="flex items-center justify-end gap-2 py-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="secondary" size="icon" disabled>
              <PencilIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="destructive" size="icon" disabled>
              <TrashIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};
