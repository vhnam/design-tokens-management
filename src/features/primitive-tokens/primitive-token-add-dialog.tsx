import { zodResolver } from '@hookform/resolvers/zod';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

import { TOKEN_TYPE_OPTIONS } from '@/contants/token';

import { TokenType } from '@/enums/token';

import { primitiveTokenSchema } from '@/schemas/primitive-token.schema';
import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { useWorkspaceStore } from '@/stores/workspace.store';

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

import { InputField } from '@/components/composites/field/input-field';
import { SelectField } from '@/components/composites/field/select-field';
import { TextareaField } from '@/components/composites/field/textarea-field';

import { useCreatePrimitiveToken } from './primitive-tokens.actions';

export const PrimitiveTokenAddDialog = () => {
  const [open, setOpen] = useState(false);

  const { activeWorkspace } = useWorkspaceStore();
  const createToken = useCreatePrimitiveToken();

  const form = useForm<PrimitiveTokenSchemaType>({
    defaultValues: {
      tokenName: '',
      tokenValue: '',
      tokenType: TokenType.Color,
      tokenDescription: '',
    },
    resolver: zodResolver(primitiveTokenSchema as never) as never,
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);
    if (!nextOpen) {
      form.reset();
    }
  };

  const onSubmit = form.handleSubmit((value) => {
    createToken.mutate(
      {
        workspaceId: activeWorkspace?.id ?? '',
        name: value.tokenName.trim(),
        value: value.tokenValue.trim(),
        type: value.tokenType,
        description: (value.tokenDescription ?? '').trim(),
      },
      {
        onSuccess: () => {
          setOpen(false);
          form.reset();
          toast.success('Token created successfully');
        },
        onError: (error) => {
          toast.error(error instanceof Error ? error.message : 'Something went wrong');
        },
      },
    );
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
          <DialogDescription>Create a new primitive token</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4" onSubmit={onSubmit}>
          <InputField control={form.control} name="tokenName" label="Name" placeholder="e.g. --color-blue-500" />

          <InputField control={form.control} name="tokenValue" label="Value" placeholder="e.g. --color-blue-500" />

          <SelectField control={form.control} name="tokenType" label="Type" items={TOKEN_TYPE_OPTIONS} />

          <TextareaField
            control={form.control}
            name="tokenDescription"
            label="Description"
            optional
            placeholder="The description of the token."
            className="min-block-[3.5rlh] min-inline-[20ch] max-inline-[50ch]"
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
