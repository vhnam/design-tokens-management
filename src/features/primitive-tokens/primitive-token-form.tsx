import { useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { TOKEN_TYPE_OPTIONS } from '@/contants/token';

import { TokenType } from '@/enums/token';

import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { Button } from '@/components/primitives/button';
import { DialogClose, DialogFooter } from '@/components/primitives/dialog';

import { InputField } from '@/components/composites/field/input-field';
import { SelectField } from '@/components/composites/field/select-field';
import { TextareaField } from '@/components/composites/field/textarea-field';

import { CompositeTokenShadowForm } from './compotite-token-shadow-form';
import { CompositeTokenTypographyForm } from './compotite-token-typography-form';

interface PrimitiveTokenFormProps {
  form: UseFormReturn<PrimitiveTokenSchemaType>;
  isPending: boolean;
  onSubmit: (data: PrimitiveTokenSchemaType) => void;
  onClose: () => void;
}

const tokenTypesWithoutValueField = new Set([
  TokenType.Typography,
  TokenType.Shadow,
  TokenType.Border,
  TokenType.Gradient,
]);

const PrimitiveTokenForm = ({ form, isPending, onSubmit, onClose }: PrimitiveTokenFormProps) => {
  const tokenType = useWatch({ control: form.control, name: 'tokenType' });

  const shouldShowValueField = !tokenTypesWithoutValueField.has(tokenType);

  return (
    <div className="no-scrollbar max-h-[50vh] overflow-y-auto -mx-4 px-4">
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputField control={form.control} name="tokenName" label="Name" placeholder="e.g. --color-blue-500" />

        <SelectField control={form.control} name="tokenType" label="Type" items={TOKEN_TYPE_OPTIONS} />

        {tokenType === TokenType.Typography && <CompositeTokenTypographyForm control={form.control} />}

        {tokenType === TokenType.Shadow && <CompositeTokenShadowForm control={form.control} />}

        {shouldShowValueField && (
          <InputField control={form.control} name="tokenValue" label="Value" placeholder="e.g. --color-blue-500" />
        )}

        <TextareaField
          control={form.control}
          name="tokenDescription"
          label="Description"
          optional
          placeholder="The description of the token."
          className="min-block-[3.5rlh] min-inline-[20ch] max-inline-[50ch]"
        />

        <DialogFooter>
          <DialogClose onClick={onClose} render={<Button type="button" variant="outline" />}>
            Cancel
          </DialogClose>
          <Button type="submit" disabled={form.formState.isSubmitting || isPending}>
            {form.formState.isSubmitting || isPending ? 'Saving…' : 'Add token'}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default PrimitiveTokenForm;
