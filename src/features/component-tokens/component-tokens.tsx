import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';

import type { ComponentToken } from '@/types/token';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';

import {
  ActionsCell,
  ComponentTokenCell,
  DescriptionCell,
  PrimitiveTokenCell,
  SemanticTokenCell,
  ValueCell,
} from './component-tokens-table';
import { useGetComponentTokens } from './component-tokens.actions';

const columnHelper = createColumnHelper<ComponentToken>();

export const ComponentTokens = () => {
  const { data, isLoading, error } = useGetComponentTokens();

  const tableData = useMemo(() => (Array.isArray(data) ? (data as ComponentToken[]) : []), [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('componentToken', {
        header: 'Component Token',
        cell: ({ row }) => <ComponentTokenCell row={row} />,
      }),
      columnHelper.accessor('semanticToken', {
        header: 'Semantic Token',
        cell: ({ row }) => <SemanticTokenCell row={row} />,
      }),
      columnHelper.accessor('semanticToken.primitiveToken.name', {
        header: 'Primitive Token',
        cell: ({ row }) => <PrimitiveTokenCell row={row} />,
      }),
      columnHelper.accessor('semanticToken.primitiveToken.value', {
        header: 'Value',
        cell: ({ row }) => <ValueCell row={row} />,
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
    data: tableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => row.id,
  });

  if (isLoading) return <div className="flex items-center justify-center h-full">Loading…</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Component Tokens</h1>
          <p className="text-sm text-muted-foreground">Component-specific tokens referencing semantic values</p>
        </div>
      </div>

      <div className="max-h-[calc(100vh-10rem)] overflow-auto rounded-none border border-border">
        <Table className="border-separate border-spacing-0">
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
      <div className="flex-1 text-sm text-muted-foreground">
        <strong>Total:</strong> {table.getFilteredRowModel().rows.length} tokens
      </div>
    </div>
  );
};
