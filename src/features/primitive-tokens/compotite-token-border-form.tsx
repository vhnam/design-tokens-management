import type { Control } from 'react-hook-form';

import { BORDER_STYLE_LIST } from '@/constants/token';

import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/primitives/card';

import { InputField } from '@/components/composites/field/input-field';
import { SelectField } from '@/components/composites/field/select-field';

interface CompositeTokenBorderFormProps {
  control: Control<PrimitiveTokenSchemaType>;
}

export const CompositeTokenBorderForm = ({ control }: CompositeTokenBorderFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Composite token: Border</CardTitle>
        <CardDescription>Define the properties of a composite token.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <InputField control={control} name="borderWidth" label="Border Width" placeholder="e.g., 1px" />
          <InputField control={control} name="borderColor" label="Border Color" placeholder="e.g., #000000" />
          <SelectField control={control} name="borderStyle" label="Border Style" items={BORDER_STYLE_LIST} />
        </div>
      </CardContent>
    </Card>
  );
};
