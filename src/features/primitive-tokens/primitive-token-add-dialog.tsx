import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TOKEN_TYPE_OPTIONS } from '@/contants/token';

import { TokenType } from '@/enums/token';

import { primitiveTokenSchema } from '@/schemas/primitive-token.schema';
import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

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

import { InputField } from '@/components/composites/input-field';
import { SelectField } from '@/components/composites/select-field';

import { useCreatePrimitiveToken } from './primitive-tokens.actions';

export const PrimitiveTokenAddDialog = () => {
  const [open, setOpen] = useState(false);

  const createToken = useCreatePrimitiveToken();

  const form = useForm<PrimitiveTokenSchemaType>({
    defaultValues: {
      name: '',
      value: '',
      type: TokenType.Color,
      description: '',
    },
    resolver: zodResolver(primitiveTokenSchema as never) as never,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      form.reset();
    }
  };

  const onSubmit = form.handleSubmit(async (value) => {
    try {
      await createToken.mutateAsync({
        name: value.name.trim(),
        value: value.value.trim(),
        type: value.type,
        description: (value.description ?? '').trim(),
      });
      form.reset();
      setOpen(false);
      toast.success('Token created successfully');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong');
    }
  });

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger
        render={
          <Button type="button">
            <PlusIcon className="size-4" /> Add token
          </Button>
        }
      />
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Add token</DialogTitle>
          <DialogDescription>Create a new primitive token.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <InputField control={form.control} name="name" label="Name" placeholder="e.g. --color-blue-500" />

          <InputField control={form.control} name="value" label="Value" placeholder="e.g. --color-blue-500" />

          <SelectField control={form.control} name="type" label="Type" items={TOKEN_TYPE_OPTIONS} />

          <InputField
            control={form.control}
            name="description"
            label="Description"
            optional
            placeholder="The description of the token."
          />

          <DialogFooter>
            <DialogClose render={<Button type="button" variant="outline" />}>Cancel</DialogClose>
            <Button type="submit" disabled={form.formState.isSubmitting || createToken.isPending}>
              {form.formState.isSubmitting || createToken.isPending ? 'Saving…' : 'Add token'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
