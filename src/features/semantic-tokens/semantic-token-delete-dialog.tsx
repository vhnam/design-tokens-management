import { useCallback } from 'react';
import { toast } from 'sonner';

import { useSemanticTokensTableStore } from '@/stores/semantic-tokens-table.store';

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

import { useDeleteSemanticTokens } from './semantic-tokens.actions';

export const SemanticTokenDeleteDialog = () => {
  const deleteToken = useDeleteSemanticTokens();
  const { isOpenDeleteDialog, selectedToken, closeDeleteDialog } = useSemanticTokensTableStore();

  const handleDelete = useCallback(() => {
    if (!selectedToken) return;
    deleteToken.mutate(
      { id: selectedToken.id },
      {
        onSuccess: () => {
          closeDeleteDialog();
          toast.success('Semantic token deleted successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  }, [selectedToken, deleteToken, closeDeleteDialog]);

  return (
    <Dialog open={isOpenDeleteDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Delete Semantic Token</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Are you sure you want to delete the selected semantic token{' '}
          <code className="bg-secondary/30 p-1 text-destructive">{selectedToken?.name}</code>?
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
