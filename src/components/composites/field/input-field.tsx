import { useId } from 'react';
import type { ComponentProps } from 'react';
import { Controller } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/primitives/field';
import { Input } from '@/components/primitives/input';

interface InputFieldProps extends Omit<ComponentProps<typeof Input>, 'name'> {
  name: string;
  label: string;
  description?: string;
  control: any;
  optional?: boolean;
}

export const InputField = ({
  control,
  name,
  label,
  id,
  description,
  optional = false,
  onChange,
  onBlur,
  ...props
}: InputFieldProps) => {
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
          <Input
            {...props}
            {...field}
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
