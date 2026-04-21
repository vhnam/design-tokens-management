import { useCallback, useState } from 'react';
import { toast } from 'sonner';

import type { PrimitiveToken } from '@/types/token';

import { Button } from '@/components/primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/primitives/dialog';

import { useDeletePrimitiveTokens } from './primitive-tokens.actions';
import { usePrimitiveTokensTableStore } from './primitive-tokens-table.store';

interface RemovePrimitiveTokenDialogProps {
  tokens: PrimitiveToken[];
}

export const RemovePrimitiveTokenDialog = ({ tokens }: RemovePrimitiveTokenDialogProps) => {
  const [open, setOpen] = useState(false);

  const deleteTokens = useDeletePrimitiveTokens();

  const handleDelete = useCallback(() => {
    deleteTokens.mutate(
      tokens.map((token) => token.id),
      {
        onSuccess: () => {
          setOpen(false);
          usePrimitiveTokensTableStore.getState().clearSelection();
          toast.success('Tokens deleted successfully');
        },
        onError: (error) => {
          toast.error(error.message);
        },
      },
    );
  }, [deleteTokens, tokens, setOpen]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <Button type="button" variant="destructive" disabled={deleteTokens.isPending}>
            Delete
          </Button>
        }
      />
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Primitive Token</DialogTitle>
        </DialogHeader>
        <DialogDescription>Are you sure you want to remove the selected primitive tokens?</DialogDescription>
        <DialogFooter>
          <DialogClose
            render={
              <Button type="button" variant="outline">
                Cancel
              </Button>
            }
          />
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Confirm deletion
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
