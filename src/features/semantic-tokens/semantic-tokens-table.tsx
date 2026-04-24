import type { Row } from '@tanstack/react-table';
import { PencilIcon, TrashIcon } from 'lucide-react';

import { TOKEN_TYPE_LABELS } from '@/contants/token';
import { TokenType } from '@/enums/token';
import type { SemanticTokenRecord } from '@/queries/semantic-tokens/semantic-tokens.type';
import { useSemanticTokensTableStore } from '@/stores/semantic-tokens-table.store';

import { Badge } from '@/components/primitives/badge';
import { Button } from '@/components/primitives/button';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

export type TableCell = {
  row: Row<SemanticTokenRecord>;
};

export const SemanticTokenCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{row.original.name}</Badge>;
};

export const GroupCell = ({ row }: TableCell) => {
  return <Badge variant="outline">{row.original.group}</Badge>;
};

export const ValueCell = ({ row }: TableCell) => {
  const value = row.original.value;
  const isColor = row.original.type === TokenType.Color;
  return (
    <div className="inline-flex cursor-default items-center gap-2 py-1">
      {isColor && <span className="inline-block size-6 shrink-0 rounded border border-border" style={{ backgroundColor: value }} />}
      {value}
    </div>
  );
};

export const TypeCell = ({ row }: TableCell) => {
  return <Badge variant="secondary">{TOKEN_TYPE_LABELS[row.original.type]}</Badge>;
};

export const DescriptionCell = ({ row }: TableCell) => {
  const text = row.original.description;
  return <span className="inline-flex items-center cursor-default py-1 text-muted-foreground">{text || '—'}</span>;
};

export const ActionsCell = ({ row }: TableCell) => {
  const { openEditDialog, openDeleteDialog } = useSemanticTokensTableStore();

  return (
    <div className="inline-flex items-center gap-2 py-1">
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="secondary" size="icon" onClick={() => openEditDialog(row.original)}>
              <PencilIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Edit</TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger
          render={
            <Button variant="destructive" size="icon" onClick={() => openDeleteDialog(row.original)}>
              <TrashIcon className="size-4" />
            </Button>
          }
        />
        <TooltipContent>Delete</TooltipContent>
      </Tooltip>
    </div>
  );
};
