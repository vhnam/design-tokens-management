import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { type ComponentProps, useId, useState } from 'react';
import { Controller } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/primitives/field';
import { Input } from '@/components/primitives/input';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/primitives/input-group';

interface PasswordFieldProps extends Omit<ComponentProps<typeof Input>, 'name' | 'type'> {
  name: string;
  label: string;
  description?: string;
  control: any;
}

export const PasswordField = ({ control, name, label, id, description, ...props }: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const fieldId = id ?? useId();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel htmlFor={fieldId}>{label}</FieldLabel>
          <InputGroup>
            <InputGroupInput {...props} {...field} id={fieldId} type={showPassword ? 'text' : 'password'} />
            <InputGroupAddon
              align="inline-end"
              className="cursor-default"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeIcon className="size-4" /> : <EyeOffIcon className="size-4" />}
            </InputGroupAddon>
          </InputGroup>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
};
