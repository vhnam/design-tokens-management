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

export const InputField = ({ control, name, label, description, optional = false, ...props }: InputFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>
            {label} {optional && <span className="text-xs text-muted-foreground">(optional)</span>}
          </FieldLabel>
          <Input {...props} {...field} />
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
};
