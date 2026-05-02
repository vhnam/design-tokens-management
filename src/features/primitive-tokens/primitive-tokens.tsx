import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { PlusIcon } from 'lucide-react';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import type { TokenType } from '@/enums/token';

import type { PrimitiveToken } from '@/types/token';

import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';
import { useWorkspaceStore } from '@/stores/workspace.store';

import { Button } from '@/components/primitives/button';
import { LottiePlayer } from '@/components/primitives/lottie-player';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';

import { PrimitiveTokenAddDialog } from './primitive-token-add-dialog';
import { PrimitiveTokenDeleteDialog } from './primitive-token-delete-dialog';
import { PrimitiveTokenEditDialog } from './primitive-token-edit-dialog';
import { PrimitiveTokensFilterBar } from './primitive-tokens-filter-bar';
import { ActionsCell, DescriptionCell, NameCell, TypeCell, ValueCell } from './primitive-tokens-table';
import { useGetPrimitiveTokens } from './primitive-tokens.actions';

type ColumnFilter = {
  id: string;
  value: unknown;
};

type ColumnFiltersState = ColumnFilter[];

const columnHelper = createColumnHelper<PrimitiveToken>();

export const PrimitiveTokens = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { activeWorkspace } = useWorkspaceStore();
  const tokenFileId = activeWorkspace?.id;
  const { data, isFetching, error } = useGetPrimitiveTokens(tokenFileId);
  const { openAddDialog } = usePrimitiveTokensTableStore();

  const tableData = useMemo(() => (Array.isArray(data) ? (data as PrimitiveToken[]) : []), [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        id: 'name',
        header: 'Name',
        cell: ({ row }) => <NameCell row={row} />,
      }),
      columnHelper.accessor((row) => row.rawValue ?? '', {
        id: 'rawValue',
        header: 'Value',
        cell: ({ row }) => <ValueCell row={row} />,
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => <TypeCell row={row} />,
        filterFn: (row, columnId, filterValue) => row.getValue(columnId) === filterValue,
      }),
      columnHelper.accessor('description', {
        header: 'Description',
        cell: ({ row }) => <DescriptionCell row={row} />,
      }),
      columnHelper.display({
        header: ' ',
        cell: ({ row }) => <ActionsCell row={row} />,
      }),
    ],
    [],
  );

  const table = useReactTable({
    columns,
    data: tableData,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getRowId: (row) => row.id,
    onColumnFiltersChange: setColumnFilters,
  });
  const pathQuery = (table.getColumn('name')?.getFilterValue() as string | undefined) ?? '';
  const selectedType = (table.getColumn('type')?.getFilterValue() as TokenType | null) ?? null;

  if (!tokenFileId)
    return (
      <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
        <p className="text-muted-foreground">Select a workspace to load primitive tokens for its token file.</p>
      </div>
    );

  if (isFetching && !data) return <div className="flex h-full items-center justify-center">Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Primitive Tokens</h1>
          <p className="text-sm text-muted-foreground">Foundation-level design tokens</p>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" onClick={openAddDialog}>
            <PlusIcon className="size-4" /> Add token
          </Button>
        </div>
      </div>

      <PrimitiveTokensFilterBar
        nameQuery={pathQuery}
        onNameQueryChange={(value) => {
          table.getColumn('name')?.setFilterValue(value.trim() === '' ? undefined : value);
        }}
        selectedType={selectedType}
        onTypeChange={(value) => {
          table.getColumn('type')?.setFilterValue(value === null ? undefined : value);
        }}
      />

      <div className="max-h-[calc(100vh-13.75rem)] overflow-auto rounded-none border border-border">
        <Table className="table-fixed border-spacing-0 [&_td]:whitespace-normal [&_td]:break-words">
          <colgroup>
            <col className="w-[25%]" />
            <col className="w-auto" />
            <col className="w-[10%]" />
            <col className="w-auto" />
            <col className="w-[10%]" />
          </colgroup>
          <TableHeader className="[&_tr]:border-border">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-border transition-colors hover:bg-transparent">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      'sticky top-0 z-10 border-b border-border bg-muted/90 px-3 text-left align-middle font-medium text-muted-foreground backdrop-blur-sm z-1',
                    )}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody className="[&_tr:last-child]:border-0">
            {table.getRowModel().rows.length === 0 ? (
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={table.getAllColumns().length} className="p-6">
                  <div className="flex items-center justify-center flex-col">
                    <LottiePlayer src="/animations/no-data.lottie" loop autoplay className="size-40" />
                    <p className="text-sm text-muted-foreground">No data found</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className={cn('border-b border-border transition-colors hover:bg-muted/40')}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="p-3 align-middle">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <div className="text-sm text-muted-foreground">
        <strong>Total:</strong> {table.getFilteredRowModel().rows.length} tokens
      </div>

      <PrimitiveTokenAddDialog />
      <PrimitiveTokenDeleteDialog />
      <PrimitiveTokenEditDialog />
    </div>
  );
};
