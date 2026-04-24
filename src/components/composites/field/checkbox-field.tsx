import { useId } from 'react';
import { Controller } from 'react-hook-form';

import { Checkbox } from '@/components/primitives/checkbox';
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from '@/components/primitives/field';

interface CheckboxItem {
  label: string;
  value: string;
  checked?: boolean;
}

interface CheckboxFieldProps {
  name: string;
  label: string;
  description?: string;
  control: any;
  optional?: boolean;
  items: CheckboxItem[];
  id?: string;
}

export const CheckboxField = ({
  control,
  name,
  label,
  id,
  description,
  optional = false,
  items,
}: CheckboxFieldProps) => {
  const fieldId = id ?? useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend variant="label">
            {label} {optional && <span className="text-xs text-muted-foreground">(optional)</span>}
          </FieldLegend>
          {description && <FieldDescription>{description}</FieldDescription>}
          <FieldGroup className="gap-3">
            {items.map((item) => (
              <Field key={item.value} orientation="horizontal">
                <Checkbox
                  id={`${fieldId}-${item.value}`}
                  checked={
                    typeof item.checked === 'boolean'
                      ? item.checked
                      : Array.isArray(field.value)
                        ? field.value.includes(item.value)
                        : false
                  }
                  onCheckedChange={(checked) => {
                    const currentValues = Array.isArray(field.value) ? field.value : [];
                    const nextValues =
                      checked === true
                        ? [...new Set([...currentValues, item.value])]
                        : currentValues.filter((value) => value !== item.value);

                    field.onChange(nextValues);
                  }}
                  onBlur={field.onBlur}
                />
                <FieldLabel htmlFor={`${fieldId}-${item.value}`}>{item.label}</FieldLabel>
              </Field>
            ))}
          </FieldGroup>
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </FieldSet>
      )}
    />
  );
};
