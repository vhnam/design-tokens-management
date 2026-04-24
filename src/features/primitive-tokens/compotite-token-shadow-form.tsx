import { MinusIcon, PlusIcon } from 'lucide-react';
import type { Control } from 'react-hook-form';

import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/primitives/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

import { InputField } from '@/components/composites/field/input-field';

interface CompositeTokenShadowFormProps {
  control: Control<PrimitiveTokenSchemaType>;
}

export const CompositeTokenShadowForm = ({ control }: CompositeTokenShadowFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Composite token: Shadow</CardTitle>
        <CardDescription>Define the properties of a composite token.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Shadow layer</h3>
          <Button variant="outline" size="sm">
            <PlusIcon className="size-4" />
            Add layer
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Layer 1</CardTitle>
            <CardAction>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <Button variant="destructive" size="icon-sm">
                      <MinusIcon className="size-4" />
                    </Button>
                  }
                />
                <TooltipContent>
                  <p>Remove layer</p>
                </TooltipContent>
              </Tooltip>
            </CardAction>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <InputField control={control} name="shadowColor" label="Color" placeholder="e.g., #000000" />
              </div>
              <InputField control={control} name="shadowX" label="Offset X" placeholder="e.g., 0" />
              <InputField control={control} name="shadowY" label="Offset Y" placeholder="e.g., 0" />
              <InputField control={control} name="shadowBlur" label="Blur" placeholder="e.g., 0" />
              <InputField control={control} name="shadowSpread" label="Spread" placeholder="e.g., 0" />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
