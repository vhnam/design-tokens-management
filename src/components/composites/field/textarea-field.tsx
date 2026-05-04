import { useId } from 'react';
import type { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/primitives/field';
import { Textarea } from '@/components/primitives/textarea';

interface TextareaFieldProps extends Omit<ComponentProps<typeof Textarea>, 'name'> {
  name: string;
  label: string;
  description?: string;
  control: any;
  optional?: boolean;
}

export const TextareaField = ({
  control,
  name,
  label,
  description,
  optional = false,
  rows = 3,
  id,
  onChange,
  onBlur,
  ...props
}: TextareaFieldProps) => {
  const fieldId = id ?? useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={fieldId}>
            {label} {optional && <span className="text-xs text-muted-foreground">(optional)</span>}
          </FieldLabel>
          <Textarea
            {...props}
            {...field}
            rows={rows}
            id={fieldId}
            onChange={(e) => {
              field.onChange(e);
              if (onChange) {
                onChange(e);
              }
            }}
            onBlur={(e) => {
              field.onBlur();
              if (onBlur) {
                onBlur(e);
              }
            }}
          />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
};
