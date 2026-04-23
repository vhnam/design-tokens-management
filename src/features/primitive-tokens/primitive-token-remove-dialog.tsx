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

interface PrimitiveTokenRemoveDialogProps {
  isOpen: boolean;
}

export const PrimitiveTokenRemoveDialog = ({ isOpen }: PrimitiveTokenRemoveDialogProps) => {
  const deleteToken = useDeletePrimitiveToken();
  const { selectedToken, closeDeleteDialog } = usePrimitiveTokensTableStore();

  const handleDelete = useCallback(() => {
    deleteToken.mutate(
      { id: selectedToken!.id },
      {
        onSuccess: () => {
          closeDeleteDialog();
          toast.success('Token deleted successfully');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [selectedToken]);

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Remove Primitive Token</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to remove the selected primitive token{' '}
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
            Confirm deletion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
