import { useCallback } from 'react';
import { toast } from 'sonner';

import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';

import { Button } from '@/components/primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/primitives/dialog';

import { useDeletePrimitiveToken } from './primitive-tokens.actions';

export const PrimitiveTokenDeleteDialog = () => {
  const deleteToken = useDeletePrimitiveToken();
  const { isOpenDeleteDialog, selectedToken, closeDeleteDialog } = usePrimitiveTokensTableStore();

  const handleDelete = useCallback(() => {
    deleteToken.mutate(
      { id: selectedToken!.id },
      {
        onSuccess: () => {
          closeDeleteDialog();
          toast.success('Token deleted successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  }, [selectedToken]);

  return (
    <Dialog open={isOpenDeleteDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Primitive Token</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete the selected primitive token{' '}
          <code className="p-1 text-destructive bg-secondary/30">{selectedToken?.name}</code>?
        </DialogDescription>
        <DialogFooter>
          <DialogClose
            onClick={closeDeleteDialog}
            render={
              <Button type="button" variant="outline" disabled={deleteToken.isPending}>
                Cancel
              </Button>
            }
          />
          <Button type="button" variant="destructive" onClick={handleDelete} disabled={deleteToken.isPending}>
            Delete token
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
