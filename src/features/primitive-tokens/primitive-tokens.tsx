import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useMemo, useState } from 'react';

import { cn } from '@/lib/utils';

import type { TokenType } from '@/enums/token';

import type { PrimitiveToken } from '@/types/token';

import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';

import { PrimitiveTokenAddDialog } from './primitive-token-add-dialog';
import { PrimitiveTokenEditDialog } from './primitive-token-edit-dialog';
import { PrimitiveTokenRemoveDialog } from './primitive-token-remove-dialog';
import { PrimitiveTokensFilterBar } from './primitive-tokens-filter-bar';
import { ActionsCell, DescriptionCell, NameCell, TypeCell, ValueCell } from './primitive-tokens-table';
import { useGetPrimitiveTokens } from './primitive-tokens.actions';

interface ColumnFilter {
  id: string;
  value: unknown;
}
type ColumnFiltersState = ColumnFilter[];

const columnHelper = createColumnHelper<PrimitiveToken>();

export const PrimitiveTokens = () => {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const { data, isLoading, error } = useGetPrimitiveTokens();
  const { isOpenDeleteDialog, isOpenEditDialog } = usePrimitiveTokensTableStore();

  const tableData = useMemo(() => (Array.isArray(data) ? (data as PrimitiveToken[]) : []), [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => <NameCell row={row} />,
        filterFn: 'includesString',
      }),
      columnHelper.accessor('value', {
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
  const nameQuery = (table.getColumn('name')?.getFilterValue() as string) ?? '';
  const selectedType = (table.getColumn('type')?.getFilterValue() as TokenType | null) ?? null;

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading…</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-col gap-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold font-heading">Primitive Tokens</h1>
          <p className="text-sm text-muted-foreground">Foundation-level design tokens</p>
        </div>
        <div className="flex items-center gap-2">
          <PrimitiveTokenAddDialog />
        </div>
      </div>

      <PrimitiveTokensFilterBar
        nameQuery={nameQuery}
        onNameQueryChange={(value) => {
          table.getColumn('name')?.setFilterValue(value.trim() === '' ? undefined : value);
        }}
        selectedType={selectedType}
        onTypeChange={(value) => {
          table.getColumn('type')?.setFilterValue(value === null ? undefined : value);
        }}
      />

      <div className="max-h-[calc(100vh-13.75rem)] overflow-auto rounded-none border border-border">
        <Table className="table-fixed border-separate border-spacing-0 [&_td]:whitespace-normal [&_td]:break-words">
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

      <PrimitiveTokenRemoveDialog isOpen={isOpenDeleteDialog} />
      <PrimitiveTokenEditDialog isOpen={isOpenEditDialog} />
    </div>
  );
};
