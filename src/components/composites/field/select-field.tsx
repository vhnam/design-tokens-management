import { useId } from 'react';
import { Controller } from 'react-hook-form';

import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/primitives/field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/primitives/select';

type SelectOption = {
  label: string;
  value: string;
};

type SelectOptionGroup = {
  group: string;
  items: SelectOption[];
};

type SelectFieldItem = SelectOption | SelectOptionGroup;

interface SelectFieldProps {
  name: string;
  label: string;
  description?: string;
  control: any;
  optional?: boolean;
  items: SelectFieldItem[];
  id?: string;
}

export const SelectField = ({ name, label, description, control, items, id, optional = false }: SelectFieldProps) => {
  const fieldId = id ?? useId();
  const options = items.flatMap((item) => ('group' in item ? item.items : [item]));

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => {
        const selectedLabel = options.find((option) => option.value === field.value)?.label;

        return (
          <Field>
            <FieldLabel htmlFor={fieldId}>
              {label} {optional && <span className="text-xs text-muted-foreground">(optional)</span>}
            </FieldLabel>
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
              }}
            >
              <SelectTrigger id={fieldId} className="w-full" onBlur={field.onBlur}>
                <SelectValue>{selectedLabel}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {items.map((item) =>
                  'group' in item ? (
                    <SelectGroup key={item.group}>
                      <SelectLabel>{item.group}</SelectLabel>
                      {item.items.map((groupItem) => (
                        <SelectItem key={groupItem.value} value={groupItem.value}>
                          {groupItem.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ) : (
                    <SelectGroup key={item.value}>
                      <SelectItem value={item.value}>{item.label}</SelectItem>
                    </SelectGroup>
                  ),
                )}
              </SelectContent>
            </Select>
            {description && <FieldDescription>{description}</FieldDescription>}
            {fieldState.error && <FieldError>{fieldState.error.message}</FieldError>}
          </Field>
        );
      }}
    />
  );
};
