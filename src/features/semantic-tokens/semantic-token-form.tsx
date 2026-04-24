import { useWatch } from 'react-hook-form';
import type { UseFormReturn } from 'react-hook-form';

import { COMPOSITE_TOKEN_TYPE_OPTIONS } from '@/contants/token';
import { TokenTheme, TokenType } from '@/enums/token';
import type { SemanticTokenFormSchemaType } from '@/schemas/semantic-token.schema';

import { Button } from '@/components/primitives/button';
import { DialogClose, DialogFooter } from '@/components/primitives/dialog';

import { InputField } from '@/components/composites/field/input-field';
import { SelectField } from '@/components/composites/field/select-field';
import { TextareaField } from '@/components/composites/field/textarea-field';

import { CompositeTokenBorderForm } from '../primitive-tokens/compotite-token-border-form';
import { CompositeTokenGradientForm } from '../primitive-tokens/compotite-token-gradient-form';
import { CompositeTokenShadowForm } from '../primitive-tokens/compotite-token-shadow-form';
import { CompositeTokenTypographyForm } from '../primitive-tokens/compotite-token-typography-form';

interface SemanticTokenFormProps {
  form: UseFormReturn<SemanticTokenFormSchemaType>;
  isPending: boolean;
  submitText: string;
  onSubmit: (data: SemanticTokenFormSchemaType) => void;
  onClose: () => void;
}

const THEME_OPTIONS = [
  { label: 'Light', value: TokenTheme.Light },
  { label: 'Dark', value: TokenTheme.Dark },
];

export const SemanticTokenForm = ({ form, isPending, submitText, onSubmit, onClose }: SemanticTokenFormProps) => {
  const tokenType = useWatch({ control: form.control, name: 'type' });

  return (
    <div className="no-scrollbar max-h-[50vh] overflow-y-auto -mx-4 px-4">
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputField control={form.control} name="name" label="Name" placeholder="e.g. --semantic-heading-lg" />
        <SelectField control={form.control} name="type" label="Type" items={COMPOSITE_TOKEN_TYPE_OPTIONS} />
        <InputField control={form.control} name="group" label="Group" placeholder="e.g. typography" />
        <SelectField control={form.control} name="theme" label="Theme" items={THEME_OPTIONS} />

        {tokenType === TokenType.Typography && (
          <CompositeTokenTypographyForm control={form.control as never} />
        )}
        {tokenType === TokenType.Shadow && <CompositeTokenShadowForm control={form.control as never} />}
        {tokenType === TokenType.Border && <CompositeTokenBorderForm control={form.control as never} />}
        {tokenType === TokenType.Gradient && <CompositeTokenGradientForm control={form.control as never} />}

        <TextareaField
          control={form.control}
          name="description"
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
            {form.formState.isSubmitting || isPending ? 'Saving...' : submitText}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};
