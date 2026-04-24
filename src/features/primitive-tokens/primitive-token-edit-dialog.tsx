import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { primitiveTokenSchema } from '@/schemas/primitive-token.schema';
import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/primitives/dialog';

import PrimitiveTokenForm from './primitive-token-form';
import { useUpdatePrimitiveToken } from './primitive-tokens.actions';

export const PrimitiveTokenEditDialog = () => {
  const updateToken = useUpdatePrimitiveToken();
  const { isOpenEditDialog, selectedToken, closeEditDialog } = usePrimitiveTokensTableStore();

  const form = useForm<PrimitiveTokenSchemaType>({
    resolver: zodResolver(primitiveTokenSchema as never) as never,
  });

  useEffect(() => {
    if (selectedToken) {
      form.reset({
        tokenName: selectedToken.name,
        tokenValue: selectedToken.value,
        tokenType: selectedToken.type,
        tokenDescription: selectedToken.description ?? '',
      });
    }
  }, [selectedToken]);

  const onSubmit = (value: PrimitiveTokenSchemaType) => {
    updateToken.mutate(
      {
        id: selectedToken!.id,
        name: value.tokenName.trim(),
        value: value.tokenValue.trim(),
        type: value.tokenType,
        description: (value.tokenDescription ?? '').trim(),
      },
      {
        onSuccess: () => {
          form.reset();
          closeEditDialog();
          toast.success('Token updated successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  };

  return (
    <Dialog open={isOpenEditDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Edit token</DialogTitle>
          <DialogDescription>Edit the selected primitive token</DialogDescription>
        </DialogHeader>

        <PrimitiveTokenForm
          form={form}
          isPending={updateToken.isPending}
          onClose={closeEditDialog}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
