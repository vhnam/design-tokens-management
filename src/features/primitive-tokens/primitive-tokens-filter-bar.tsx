import { TOKEN_TYPE_LABELS, TOKEN_TYPE_OPTIONS } from '@/contants/token';

import type { TokenType } from '@/enums/token';

import { Badge } from '@/components/primitives/badge';
import { Input } from '@/components/primitives/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/primitives/select';

type PrimitiveTokensFilterBarProps = {
  nameQuery: string;
  onNameQueryChange: (value: string) => void;
  selectedType: TokenType | null;
  onTypeChange: (value: TokenType | null) => void;
};

const FINALIZE_TYPE_OPTION = [{ label: 'All types', value: null }, ...TOKEN_TYPE_OPTIONS];

export const PrimitiveTokensFilterBar = ({
  nameQuery,
  onNameQueryChange,
  selectedType,
  onTypeChange,
}: PrimitiveTokensFilterBarProps) => {
  return (
    <div className="flex items-center gap-6 rounded-none border border-border bg-muted/20 px-3 py-2">
      <Badge variant="secondary" className="uppercase">
        Filters
      </Badge>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-foreground/80">Name</span>
        <Input
          value={nameQuery}
          onChange={(event) => onNameQueryChange(event.target.value)}
          placeholder="Search token name..."
          className="w-3xs"
        />
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-foreground/80">Type</span>
        <Select value={selectedType} onValueChange={onTypeChange}>
          <SelectTrigger className="w-[180px]">
            <SelectValue>{selectedType ? TOKEN_TYPE_LABELS[selectedType] : 'All types'}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            {FINALIZE_TYPE_OPTION.map((item) =>
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
      </div>
    </div>
  );
};
