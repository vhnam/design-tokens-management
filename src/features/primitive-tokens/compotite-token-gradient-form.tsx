import { MinusIcon, PlusIcon } from 'lucide-react';
import type { Control } from 'react-hook-form';

import type { PrimitiveTokenSchemaType } from '@/schemas/primitive-token.schema';

import { Button } from '@/components/primitives/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/primitives/card';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/primitives/tooltip';

import { InputField } from '@/components/composites/field/input-field';

interface CompositeTokenGradientFormProps {
  control: Control<PrimitiveTokenSchemaType>;
}

export const CompositeTokenGradientForm = ({ control }: CompositeTokenGradientFormProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Composite token: Gradient</CardTitle>
        <CardDescription>Define the properties of a composite token.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Gradient stops</h3>
          <Button variant="outline" size="sm">
            <PlusIcon className="size-4" />
            Add stop
          </Button>
        </div>

        {/* <div className="mb-3">
          <div className="text-xs text-gray-600 mb-2">Preview:</div>
          <div
            className="w-full h-8 rounded border border-gray-300"
            style={{
              background: tokenForm.gradient.every((s) => s.color && s.position)
                ? `linear-gradient(to right, ${tokenForm.gradient
                    .map((stop) => `${stop.color} ${parseFloat(stop.position || '0') * 100}%`)
                    .join(', ')})`
                : '#f3f4f6',
            }}
          />
        </div> */}

        <Card>
          <CardHeader>
            <CardTitle>Stop 1</CardTitle>
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
              <InputField control={control} name="gradientStopColor" label="Color" placeholder="e.g., #000000" />
              <InputField control={control} name="gradientStopPosition" label="Position (0-1)" placeholder="e.g., 0" />
            </div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
};
