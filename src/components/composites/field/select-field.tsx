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
}

export const SelectField = ({ name, label, description, control, items }: SelectFieldProps) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Field>
          <FieldLabel>{label}</FieldLabel>
          <Select
            items={items}
            name={field.name}
            value={field.value}
            onValueChange={(value) => {
              field.onChange(value);
            }}
          >
            <SelectTrigger id={field.name} className="w-full" onBlur={field.onBlur}>
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
