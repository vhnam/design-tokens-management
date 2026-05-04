import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TokenType } from '@/enums/token';

import { primitiveTokenSchema } from '@/schemas/primitive-token.schema';
import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { useOrganizationStore } from '@/stores/organization.store';
import { usePrimitiveTokensTableStore } from '@/stores/primitive-tokens-table.store';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/primitives/dialog';

import PrimitiveTokenForm from './primitive-token-form';
import { useCreatePrimitiveToken } from './primitive-tokens.actions';

export const PrimitiveTokenAddDialog = () => {
  const createToken = useCreatePrimitiveToken();

  const { activeOrganization } = useOrganizationStore();
  const { isOpenAddDialog, closeAddDialog } = usePrimitiveTokensTableStore();

  const form = useForm<PrimitiveTokenSchemaType>({
    defaultValues: {
      tokenName: '',
      tokenDotPath: '',
      tokenValue: '',
      tokenType: TokenType.Color,
      tokenDescription: '',
    },
    resolver: zodResolver(primitiveTokenSchema as never) as never,
  });

  const onSubmit = (value: PrimitiveTokenSchemaType) => {
    createToken.mutate(
      {
        organizationId: activeOrganization!.id,
        name: value.tokenName.trim(),
        dotPath: value.tokenDotPath.trim(),
        rawValue: value.tokenValue.trim(),
        type: value.tokenType,
        description: (value.tokenDescription ?? '').trim(),
      },
      {
        onSuccess: () => {
          closeAddDialog();
          form.reset();
          toast.success('Token created successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
  };

  return (
    <Dialog open={isOpenAddDialog}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add token</DialogTitle>
          <DialogDescription>Create a new primitive token</DialogDescription>
        </DialogHeader>

        <PrimitiveTokenForm
          form={form}
          isPending={createToken.isPending}
          submitText="Add token"
          onClose={closeAddDialog}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
