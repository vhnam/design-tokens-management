import { useForm } from '@tanstack/react-form';
import { useState } from 'react';
import { toast } from 'sonner';

import type { TokenType } from '@/db/schema';

import { Button } from '@/components/primitives/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/primitives/dialog';
import { Input } from '@/components/primitives/input';
import { Label } from '@/components/primitives/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/primitives/select';

import { useCreatePrimitiveToken } from './primitive-tokens.actions';

const TOKEN_TYPE_OPTIONS: { label: string; value: TokenType }[] = [
  {
    label: 'Color',
    value: 'color',
  },
  {
    label: 'Dimension',
    value: 'dimension',
  },
  {
    label: 'Font Family',
    value: 'fontFamily',
  },
  {
    label: 'Font Weight',
    value: 'fontWeight',
  },
  {
    label: 'Duration',
    value: 'duration',
  },
  {
    label: 'Cubic Bezier',
    value: 'cubicBezier',
  },
  {
    label: 'Number',
    value: 'number',
  },
];

export const AddPrimitiveTokenDialog = () => {
  const [open, setOpen] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const createToken = useCreatePrimitiveToken();

  const form = useForm({
    defaultValues: {
      name: '',
      value: '',
      type: 'color' as TokenType,
      description: '',
    },
    onSubmit: async ({ value }) => {
      setSubmitError(null);
      try {
        await createToken.mutateAsync({
          name: value.name.trim(),
          value: value.value.trim(),
          type: value.type,
          description: value.description.trim(),
        });
        form.reset();
        setOpen(false);
        toast.success('Token created successfully');
      } catch (error) {
        setSubmitError(error instanceof Error ? error.message : 'Something went wrong');
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen);
        if (!nextOpen) {
          form.reset();
          setSubmitError(null);
        }
      }}
    >
      <DialogTrigger render={<Button type="button">Add token</Button>} />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add token</DialogTitle>
          <DialogDescription>Create a new primitive token in the library.</DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            event.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <form.Field
            name="name"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Name</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="e.g. --color-blue-500"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </div>
            )}
          />

          <form.Field
            name="value"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Value</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  autoComplete="off"
                  required
                  placeholder="e.g. #3b82f6 or 1rem"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </div>
            )}
          />

          <form.Field
            name="type"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Type</Label>
                <Select
                  items={TOKEN_TYPE_OPTIONS}
                  name={field.name}
                  required
                  value={field.state.value}
                  onValueChange={(value) => {
                    if (value != null) field.handleChange(value);
                  }}
                >
                  <SelectTrigger id={field.name} className="w-full" onBlur={field.handleBlur}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {TOKEN_TYPE_OPTIONS.map((tokenType) => (
                      <SelectItem key={tokenType.value} value={tokenType.value}>
                        {tokenType.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <div className="grid gap-2">
                <Label htmlFor={field.name}>Description (optional)</Label>
                <Input
                  id={field.name}
                  name={field.name}
                  type="text"
                  autoComplete="off"
                  placeholder="Optional"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(event) => field.handleChange(event.target.value)}
                />
              </div>
            )}
          />

          {submitError ? <p className="text-xs text-destructive">{submitError}</p> : null}

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <form.Subscribe
              selector={(state) => [state.isSubmitting, createToken.isPending] as const}
              children={([isSubmitting, isPending]) => (
                <Button type="submit" disabled={isSubmitting || isPending}>
                  {isSubmitting || isPending ? 'Saving…' : 'Add token'}
                </Button>
              )}
            />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
