import { useId } from 'react';
import { Controller } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/primitives/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/primitives/select';

interface SelectItem {
  label: string;
  value: string;
}

interface SelectFieldProps {
  name: string;
  label: string;
  description?: string;
  control: any;
  optional?: boolean;
  items: SelectItem[];
  id?: string;
}

export const SelectField = ({ name, label, description, control, items, id, optional = false }: SelectFieldProps) => {
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
          <Select
            items={items}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <SelectTrigger id={fieldId} className="w-full" onBlur={field.onBlur}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {items.map((item: any) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          {description && <FieldDescription>{description}</FieldDescription>}
          {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
        </Field>
      )}
    />
  );
};
