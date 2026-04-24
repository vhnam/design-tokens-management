import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TokenTheme, TokenType } from '@/enums/token';
import { semanticTokenFormSchema } from '@/schemas/semantic-token.schema';
import type { SemanticTokenFormSchemaType } from '@/schemas/semantic-token.schema';
import { useSemanticTokensTableStore } from '@/stores/semantic-tokens-table.store';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/primitives/dialog';

import { useCreateSemanticToken } from './semantic-tokens.actions';
import { SemanticTokenForm } from './semantic-token-form';

const getSemanticValueForSubmit = (value: SemanticTokenFormSchemaType) => {
  if (value.type === TokenType.Typography) {
    return JSON.stringify({
      fontFamily: value.fontFamily?.trim() ?? '',
      fontSize: value.fontSize?.trim() ?? '',
      fontWeight: value.fontWeight?.trim() ?? '',
      lineHeight: value.lineHeight?.trim() ?? '',
      letterSpacing: value.letterSpacing?.trim() ?? '',
    });
  }

  if (value.type === TokenType.Shadow) {
    return JSON.stringify({
      color: value.shadowColor?.trim() ?? '',
      x: value.shadowX?.trim() ?? '',
      y: value.shadowY?.trim() ?? '',
      blur: value.shadowBlur?.trim() ?? '',
      spread: value.shadowSpread?.trim() ?? '',
    });
  }

  if (value.type === TokenType.Border) {
    return JSON.stringify({
      width: value.borderWidth?.trim() ?? '',
      color: value.borderColor?.trim() ?? '',
      style: value.borderStyle?.trim() ?? '',
    });
  }

  return JSON.stringify({
    stops: [
      {
        color: value.gradientStopColor?.trim() ?? '',
        position: value.gradientStopPosition?.trim() ?? '',
      },
    ],
  });
};

export const SemanticTokenAddDialog = () => {
  const createToken = useCreateSemanticToken();
  const { isOpenAddDialog, closeAddDialog } = useSemanticTokensTableStore();

  const form = useForm<SemanticTokenFormSchemaType>({
    defaultValues: {
      name: '',
      value: '',
      type: TokenType.Typography,
      group: '',
      theme: TokenTheme.Light,
      description: '',
    },
    resolver: zodResolver(semanticTokenFormSchema as never) as never,
  });

  const onSubmit = (value: SemanticTokenFormSchemaType) => {
    createToken.mutate(
      {
        name: value.name.trim(),
        value: getSemanticValueForSubmit(value),
        type: value.type,
        group: value.group.trim(),
        theme: value.theme,
        description: (value.description ?? '').trim(),
      },
      {
        onSuccess: () => {
          closeAddDialog();
          form.reset();
          toast.success('Semantic token created successfully');
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
          <DialogTitle>Add semantic token</DialogTitle>
          <DialogDescription>Create a new semantic composite token</DialogDescription>
        </DialogHeader>

        <SemanticTokenForm
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
