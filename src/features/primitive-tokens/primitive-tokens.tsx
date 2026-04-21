import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type { Row, Table as TanstackTable } from '@tanstack/react-table';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { toast } from 'sonner';

import { cn } from '@/lib/utils';

import type { TokenType } from '@/db/schema';
import type { PrimitiveToken } from '@/types/token';

import { Badge } from '@/components/primitives/badge';
import { Input } from '@/components/primitives/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';

import { AddPrimitiveTokenDialog } from './add-primitive-token-dialog';
import { usePrimitiveTokensActions, useUpdatePrimitiveToken } from './primitive-tokens.actions';
import type { UpdatePrimitiveTokenInput } from './primitive-tokens.actions';
import { RemovePrimitiveTokenDialog } from './remove-primitive-token-dialog';
import { usePrimitiveTokensTableStore } from './primitive-tokens-table.store';

const columnHelper = createColumnHelper<PrimitiveToken>();

const checkboxClass =
  'size-3.5 shrink-0 cursor-pointer rounded-none border border-input accent-foreground disabled:cursor-not-allowed disabled:opacity-50';

const TOKEN_TYPE_OPTIONS: TokenType[] = [
  'color',
  'dimension',
  'fontFamily',
  'fontWeight',
  'duration',
  'cubicBezier',
  'number',
];

type TableMeta = {
  orderedIds: string[];
  commitEdit: () => void;
};

function isInteractiveTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  return Boolean(target.closest('input,button,select,textarea,a,[role="combobox"]'));
}

function SelectAllCheckbox({ table }: { table: TanstackTable<PrimitiveToken> }) {
  const ref = useRef<HTMLInputElement>(null);
  const selectedIds = usePrimitiveTokensTableStore((s) => s.selectedIds);
  const toggleSelectAll = usePrimitiveTokensTableStore((s) => s.toggleSelectAll);
  const editing = usePrimitiveTokensTableStore((s) => s.editing);

  const orderedIds = (table.options.meta as TableMeta | undefined)?.orderedIds ?? [];
  const allSelected = orderedIds.length > 0 && selectedIds.length === orderedIds.length;
  const someSelected = selectedIds.length > 0 && !allSelected;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.indeterminate = someSelected;
  }, [someSelected]);

  return (
    <input
      ref={ref}
      type="checkbox"
      className={checkboxClass}
      checked={allSelected}
      disabled={Boolean(editing) || orderedIds.length === 0}
      onChange={() => toggleSelectAll(orderedIds)}
      aria-label="Select all rows"
    />
  );
}

function RowSelectCheckbox({ row, table }: { row: Row<PrimitiveToken>; table: TanstackTable<PrimitiveToken> }) {
  const applyRowSelection = usePrimitiveTokensTableStore((s) => s.applyRowSelection);
  const selectedIds = usePrimitiveTokensTableStore((s) => s.selectedIds);
  const editing = usePrimitiveTokensTableStore((s) => s.editing);

  const orderedIds = (table.options.meta as TableMeta | undefined)?.orderedIds ?? [];
  const rowIndex = row.index;
  const rowId = row.original.id;
  const checked = selectedIds.includes(rowId);

  return (
    <input
      type="checkbox"
      className={checkboxClass}
      checked={checked}
      disabled={Boolean(editing)}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        applyRowSelection({
          rowId,
          rowIndex,
          shiftKey: e.shiftKey,
          metaKey: e.metaKey,
          ctrlKey: e.ctrlKey,
          orderedIds,
          source: 'checkbox',
        });
      }}
      onChange={() => {
        /* selection is driven from onClick so modifier keys are available */
      }}
      aria-label={`Select row ${row.original.name}`}
    />
  );
}

function useCommitEdit() {
  const update = useUpdatePrimitiveToken();
  const completeEdit = usePrimitiveTokensTableStore((s) => s.completeEdit);

  return useCallback(() => {
    const editing = usePrimitiveTokensTableStore.getState().editing;
    if (!editing) return;

    const payload: UpdatePrimitiveTokenInput = { id: editing.tokenId };
    switch (editing.columnId) {
      case 'name':
        payload.name = editing.draft.trim();
        break;
      case 'value':
        payload.value = editing.draft.trim();
        break;
      case 'type':
        if (!TOKEN_TYPE_OPTIONS.includes(editing.draft as TokenType)) {
          toast.error('Invalid token type');
          return;
        }
        payload.type = editing.draft as TokenType;
        break;
      case 'description':
        payload.description = editing.draft.trim() === '' ? null : editing.draft.trim();
        break;
      default:
        return;
    }

    update.mutate(payload, {
      onSuccess: () => {
        completeEdit();
        toast.success('Token updated');
      },
      onError: (err) => {
        toast.error(err.message);
      },
    });
  }, [completeEdit, update]);
}

function NameCell({ row, table }: { row: Row<PrimitiveToken>; table: TanstackTable<PrimitiveToken> }) {
  const editing = usePrimitiveTokensTableStore((s) => s.editing);
  const tryBeginEdit = usePrimitiveTokensTableStore((s) => s.tryBeginEdit);
  const setEditDraft = usePrimitiveTokensTableStore((s) => s.setEditDraft);
  const cancelEdit = usePrimitiveTokensTableStore((s) => s.cancelEdit);
  const commitEdit = (table.options.meta as TableMeta).commitEdit;

  if (editing?.tokenId === row.original.id && editing.columnId === 'name') {
    return (
      <Input
        autoFocus
        className="h-8"
        value={editing.draft}
        onChange={(e) => setEditDraft(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
          }
          if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            commitEdit();
          }
        }}
      />
    );
  }

  return (
    <span
      className="block min-h-8 cursor-default py-1"
      onDoubleClick={(e) => {
        e.stopPropagation();
        tryBeginEdit(row.original.id, 'name', row.original.name);
      }}
    >
      {row.original.name}
    </span>
  );
}

function ValueCell({ row, table }: { row: Row<PrimitiveToken>; table: TanstackTable<PrimitiveToken> }) {
  const editing = usePrimitiveTokensTableStore((s) => s.editing);
  const tryBeginEdit = usePrimitiveTokensTableStore((s) => s.tryBeginEdit);
  const setEditDraft = usePrimitiveTokensTableStore((s) => s.setEditDraft);
  const cancelEdit = usePrimitiveTokensTableStore((s) => s.cancelEdit);
  const commitEdit = (table.options.meta as TableMeta).commitEdit;

  if (editing?.tokenId === row.original.id && editing.columnId === 'value') {
    return (
      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
        <span
          className="inline-block size-4 shrink-0 rounded-full border border-border"
          style={{ backgroundColor: editing.draft }}
        >
          &nbsp;
        </span>
        <Input
          autoFocus
          className="h-8"
          value={editing.draft}
          onChange={(e) => setEditDraft(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.preventDefault();
              cancelEdit();
            }
            if (e.key === 'Enter' || e.key === 'Tab') {
              e.preventDefault();
              commitEdit();
            }
          }}
        />
      </div>
    );
  }

  const value = row.original.value;
  return (
    <div
      className="flex min-h-8 cursor-default items-center gap-2 py-1"
      onDoubleClick={(e) => {
        e.stopPropagation();
        tryBeginEdit(row.original.id, 'value', value);
      }}
    >
      <span className="inline-block size-4 shrink-0 rounded-full border border-border" style={{ backgroundColor: value }}>
        &nbsp;
      </span>
      {value}
    </div>
  );
}

function TypeCell({ row, table }: { row: Row<PrimitiveToken>; table: TanstackTable<PrimitiveToken> }) {
  const editing = usePrimitiveTokensTableStore((s) => s.editing);
  const tryBeginEdit = usePrimitiveTokensTableStore((s) => s.tryBeginEdit);
  const setEditDraft = usePrimitiveTokensTableStore((s) => s.setEditDraft);
  const cancelEdit = usePrimitiveTokensTableStore((s) => s.cancelEdit);
  const commitEdit = (table.options.meta as TableMeta).commitEdit;

  if (editing?.tokenId === row.original.id && editing.columnId === 'type') {
    return (
      <select
        autoFocus
        className={cn(
          'h-8 w-full min-w-[10rem] rounded-none border border-input bg-transparent px-2 text-xs outline-none',
          'focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50',
        )}
        value={editing.draft}
        onChange={(e) => setEditDraft(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
          }
          if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            commitEdit();
          }
        }}
      >
        {TOKEN_TYPE_OPTIONS.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    );
  }

  return (
    <span
      className="inline-flex min-h-8 cursor-default items-center py-1"
      onDoubleClick={(e) => {
        e.stopPropagation();
        tryBeginEdit(row.original.id, 'type', row.original.type);
      }}
    >
      <Badge variant="outline">{row.original.type}</Badge>
    </span>
  );
}

function DescriptionCell({ row, table }: { row: Row<PrimitiveToken>; table: TanstackTable<PrimitiveToken> }) {
  const editing = usePrimitiveTokensTableStore((s) => s.editing);
  const tryBeginEdit = usePrimitiveTokensTableStore((s) => s.tryBeginEdit);
  const setEditDraft = usePrimitiveTokensTableStore((s) => s.setEditDraft);
  const cancelEdit = usePrimitiveTokensTableStore((s) => s.cancelEdit);
  const commitEdit = (table.options.meta as TableMeta).commitEdit;

  if (editing?.tokenId === row.original.id && editing.columnId === 'description') {
    return (
      <Input
        autoFocus
        className="h-8"
        value={editing.draft}
        onChange={(e) => setEditDraft(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            e.preventDefault();
            cancelEdit();
          }
          if (e.key === 'Enter' || e.key === 'Tab') {
            e.preventDefault();
            commitEdit();
          }
        }}
      />
    );
  }

  const text = row.original.description;
  return (
    <span
      className="block min-h-8 cursor-default py-1 text-muted-foreground"
      onDoubleClick={(e) => {
        e.stopPropagation();
        tryBeginEdit(row.original.id, 'description', text);
      }}
    >
      {text || '—'}
    </span>
  );
}

export const PrimitiveTokens = () => {
  const { data, isLoading, error } = usePrimitiveTokensActions();
  const selectedIds = usePrimitiveTokensTableStore((s) => s.selectedIds);
  const applyRowSelection = usePrimitiveTokensTableStore((s) => s.applyRowSelection);
  const editing = usePrimitiveTokensTableStore((s) => s.editing);

  const tableData = useMemo(() => (Array.isArray(data) ? (data as PrimitiveToken[]) : []), [data]);
  const orderedIds = useMemo(() => tableData.map((r) => r.id), [tableData]);

  const commitEdit = useCommitEdit();

  const columns = useMemo(
    () => [
      columnHelper.display({
        id: 'select',
        header: ({ table }) => <SelectAllCheckbox table={table} />,
        cell: ({ row, table }) => <RowSelectCheckbox row={row} table={table} />,
      }),
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row, table }) => <NameCell row={row} table={table} />,
      }),
      columnHelper.accessor('value', {
        header: 'Value',
        cell: ({ row, table }) => <ValueCell row={row} table={table} />,
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row, table }) => <TypeCell row={row} table={table} />,
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row, table }) => <DescriptionCell row={row} table={table} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
    meta: {
      orderedIds,
      commitEdit,
    } satisfies TableMeta,
  });

  const selectedTokens = useMemo(
    () => tableData.filter((t) => selectedIds.includes(t.id)),
    [tableData, selectedIds],
  );

  const showDelete = selectedIds.length > 1;

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Primitive Tokens</h1>
        <div className="flex items-center gap-2">
          {showDelete && <RemovePrimitiveTokenDialog tokens={selectedTokens} />}
          <AddPrimitiveTokenDialog />
        </div>
      </div>

      <div className="h-[calc(100vh-8rem)] overflow-auto rounded-none border border-border">
        <Table className="border-separate border-spacing-0">
          <TableHeader className="[&_tr]:border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border transition-colors hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'sticky top-0 z-10 border-b border-border bg-muted/90 px-3 text-left align-middle font-medium text-muted-foreground backdrop-blur-sm',
                      header.column.id === 'select' && 'w-10',
                    )}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows.map((row) => {
              const selected = selectedIds.includes(row.original.id);
              return (
                <TableRow
                  key={row.id}
                  className={cn(
                    'border-b border-border transition-colors hover:bg-muted/40',
                    selected && 'bg-muted/60',
                  )}
                  data-state={selected ? 'selected' : undefined}
                  onClick={(e) => {
                    if (editing) return;
                    if (isInteractiveTarget(e.target)) return;
                    applyRowSelection({
                      rowId: row.original.id,
                      rowIndex: row.index,
                      shiftKey: e.shiftKey,
                      metaKey: e.metaKey,
                      ctrlKey: e.ctrlKey,
                      orderedIds,
                    });
                  }}
                  onDoubleClick={(e) => {
                    if (editing) return;
                    if (selectedIds.length <= 1) return;
                    if (isInteractiveTarget(e.target)) return;
                    toast.message('Select one row to edit');
                  }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
