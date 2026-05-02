import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TokenTheme, TokenType } from '@/enums/token';

import { semanticTokenFormSchema } from '@/schemas/semantic-token.schema';
import type { SemanticTokenFormSchemaType } from '@/schemas/semantic-token.schema';

import { useSemanticTokensTableStore } from '@/stores/semantic-tokens-table.store';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/primitives/dialog';

import { SemanticTokenForm } from './semantic-token-form';
import { useUpdateSemanticToken } from './semantic-tokens.actions';

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

const getCompositeFieldsFromValue = (value: string) => {
  try {
    const parsed = JSON.parse(value) as Record<string, unknown>;
    const firstStop = Array.isArray(parsed.stops)
      ? (parsed.stops[0] as Record<string, unknown> | undefined)
      : undefined;
    return {
      fontFamily: typeof parsed.fontFamily === 'string' ? parsed.fontFamily : '',
      fontSize: typeof parsed.fontSize === 'string' ? parsed.fontSize : '',
      fontWeight: typeof parsed.fontWeight === 'string' ? parsed.fontWeight : '',
      lineHeight: typeof parsed.lineHeight === 'string' ? parsed.lineHeight : '',
      letterSpacing: typeof parsed.letterSpacing === 'string' ? parsed.letterSpacing : '',
      shadowColor: typeof parsed.color === 'string' ? parsed.color : '',
      shadowX: typeof parsed.x === 'string' ? parsed.x : '',
      shadowY: typeof parsed.y === 'string' ? parsed.y : '',
      shadowBlur: typeof parsed.blur === 'string' ? parsed.blur : '',
      shadowSpread: typeof parsed.spread === 'string' ? parsed.spread : '',
      borderWidth: typeof parsed.width === 'string' ? parsed.width : '',
      borderColor: typeof parsed.color === 'string' ? parsed.color : '',
      borderStyle: typeof parsed.style === 'string' ? parsed.style : '',
      gradientStopColor: typeof firstStop?.color === 'string' ? firstStop.color : '',
      gradientStopPosition: typeof firstStop?.position === 'string' ? firstStop.position : '',
    };
  } catch {
    return {
      fontFamily: '',
      fontSize: '',
      fontWeight: '',
      lineHeight: '',
      letterSpacing: '',
      shadowColor: '',
      shadowX: '',
      shadowY: '',
      shadowBlur: '',
      shadowSpread: '',
      borderWidth: '',
      borderColor: '',
      borderStyle: '',
      gradientStopColor: '',
      gradientStopPosition: '',
    };
  }
};

export const SemanticTokenEditDialog = () => {
  const updateToken = useUpdateSemanticToken();
  const { isOpenEditDialog, selectedToken, closeEditDialog } = useSemanticTokensTableStore();

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

  useEffect(() => {
    if (!selectedToken) return;
    form.reset({
      name: selectedToken.name,
      value: selectedToken.value,
      type: selectedToken.type as SemanticTokenFormSchemaType['type'],
      group: selectedToken.group,
      theme: selectedToken.theme,
      description: selectedToken.description ?? '',
      ...getCompositeFieldsFromValue(selectedToken.value),
    });
  }, [selectedToken]);

  const onSubmit = (value: SemanticTokenFormSchemaType) => {
    if (!selectedToken) return;

    updateToken.mutate(
      {
        id: selectedToken.id,
        name: value.name.trim(),
        value: getSemanticValueForSubmit(value),
        type: value.type,
        group: value.group.trim(),
        theme: value.theme,
        description: (value.description ?? '').trim(),
      },
      {
        onSuccess: () => {
          closeEditDialog();
          form.reset();
          toast.success('Semantic token updated successfully');
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
          <DialogTitle>Edit semantic token</DialogTitle>
          <DialogDescription>Edit the selected semantic composite token</DialogDescription>
        </DialogHeader>

        <SemanticTokenForm
          form={form}
          isPending={updateToken.isPending}
          submitText="Update token"
          onClose={closeEditDialog}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
