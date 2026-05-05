import type { UseFormReturn } from 'react-hook-form';

import { PRIMITIVE_TOKEN_TYPE_OPTIONS } from '@/constants/token';

import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { Button } from '@/components/primitives/button';
import { DialogClose, DialogFooter } from '@/components/primitives/dialog';

import { InputField } from '@/components/composites/field/input-field';
import { SelectField } from '@/components/composites/field/select-field';
import { TextareaField } from '@/components/composites/field/textarea-field';

interface PrimitiveTokenFormProps {
  form: UseFormReturn<PrimitiveTokenSchemaType>;
  isPending: boolean;
  onSubmit: (data: PrimitiveTokenSchemaType) => void;
  onClose: () => void;
  submitText: string;
}

const PrimitiveTokenForm = ({ form, isPending, submitText, onSubmit, onClose }: PrimitiveTokenFormProps) => {
  return (
    <div className="no-scrollbar max-h-[50vh] overflow-y-auto -mx-4 px-4">
      <form className="grid gap-4" onSubmit={form.handleSubmit(onSubmit)}>
        <InputField control={form.control} name="tokenName" label="Name" placeholder="e.g. --color-neutral-100" />
        <InputField control={form.control} name="tokenDotPath" label="Dot path" placeholder="e.g. color.blue.500" />
        <SelectField control={form.control} name="tokenType" label="Type" items={PRIMITIVE_TOKEN_TYPE_OPTIONS} />
        <InputField
          control={form.control}
          name="tokenValue"
          label="Raw value"
          placeholder="e.g. #087eb4 or {alias.path}"
        />
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
            {form.formState.isSubmitting || isPending ? 'Saving…' : submitText}
          </Button>
        </DialogFooter>
      </form>
    </div>
  );
};

export default PrimitiveTokenForm;
