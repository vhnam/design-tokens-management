import type { Control } from 'react-hook-form';

import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/primitives/card';

import { InputField } from '@/components/composites/field/input-field';

interface CompositeTokenTypographyFormProps {
  control: Control<PrimitiveTokenSchemaType>;
}

export const CompositeTokenTypographyForm = ({ control }: CompositeTokenTypographyFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Composite token: Typography</CardTitle>
        <CardDescription>Define the properties of a composite token.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <InputField control={control} name="fontFamily" label="Font Family" placeholder="e.g., Inter, sans-serif" />
          <InputField control={control} name="fontSize" label="Font Size" placeholder="e.g., 16px" />
          <InputField control={control} name="fontWeight" label="Font Weight" placeholder="e.g., 400" />
          <InputField control={control} name="lineHeight" label="Line Height" placeholder="e.g., 1.5" />
          <InputField control={control} name="letterSpacing" label="Letter Spacing" placeholder="e.g., 0.01em" />
        </div>
      </CardContent>
    </Card>
  );
};
