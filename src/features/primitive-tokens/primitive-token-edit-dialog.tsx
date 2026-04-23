import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TOKEN_TYPE_OPTIONS } from '@/contants/token';

import { primitiveTokenSchema } from '@/schemas/primitive-token.schema';
import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

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

import { InputField } from '@/components/composites/field/input-field';
import { SelectField } from '@/components/composites/field/select-field';
import { TextareaField } from '@/components/composites/field/textarea-field';

import { useUpdatePrimitiveToken } from './primitive-tokens.actions';

interface PrimitiveTokenEditDialogProps {
  isOpen: boolean;
}

export const PrimitiveTokenEditDialog = ({ isOpen }: PrimitiveTokenEditDialogProps) => {
  const updateToken = useUpdatePrimitiveToken();
  const { selectedToken, closeEditDialog } = usePrimitiveTokensTableStore();

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

  const onSubmit = form.handleSubmit((value) => {
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
  });

  return (
    <Dialog open={isOpen}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Edit token</DialogTitle>
          <DialogDescription>Edit the selected primitive token</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <InputField control={form.control} name="tokenName" label="Name" placeholder="e.g. --color-blue-500" />

          <InputField control={form.control} name="tokenValue" label="Value" placeholder="e.g. --color-blue-500" />

          <SelectField control={form.control} name="tokenType" label="Type" items={TOKEN_TYPE_OPTIONS} />

          <TextareaField
            control={form.control}
            name="tokenDescription"
            label="Description"
            optional
            placeholder="The description of the token."
            className="min-block-[3.5rlh] min-inline-[20ch] max-inline-[50ch]"
          />

          <DialogFooter>
            <DialogClose
              onClick={closeEditDialog}
              render={
                <Button type="button" variant="outline" disabled={updateToken.isPending}>
                  Cancel
                </Button>
              }
            />
            <Button type="submit" disabled={form.formState.isSubmitting || updateToken.isPending}>
              {form.formState.isSubmitting || updateToken.isPending ? 'Saving…' : 'Update token'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
