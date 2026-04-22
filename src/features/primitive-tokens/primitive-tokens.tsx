import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { useMemo } from 'react';

import { cn } from '@/lib/utils';

import type { PrimitiveToken } from '@/types/token';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/primitives/table';

import { PrimitiveTokenAddDialog } from './primitive-token-add-dialog';
import { ActionsCell, DescriptionCell, NameCell, TypeCell, ValueCell } from './primitive-tokens-table';
import { usePrimitiveTokensActions } from './primitive-tokens.actions';

const columnHelper = createColumnHelper<PrimitiveToken>();

export const PrimitiveTokens = () => {
  const { data, isLoading, error } = usePrimitiveTokensActions();

  const tableData = useMemo(() => (Array.isArray(data) ? (data as PrimitiveToken[]) : []), [data]);

  const columns = useMemo(
    () => [
      columnHelper.accessor('name', {
        header: 'Name',
        cell: ({ row }) => <NameCell row={row} />,
      }),
      columnHelper.accessor('value', {
        header: 'Value',
        cell: ({ row }) => <ValueCell row={row} />,
      }),
      columnHelper.accessor('type', {
        header: 'Type',
        cell: ({ row }) => <TypeCell row={row} />,
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

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <DotLottieReact src="/animations/loading.lottie" loop autoplay className="size-10" />
      </div>
    );

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-full space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Primitive Tokens</h1>
        <div className="flex items-center gap-2">
          <PrimitiveTokenAddDialog />
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
            {table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className={cn('border-b border-border transition-colors hover:bg-muted/40')}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className="p-3 align-middle">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
