import { TOKEN_TYPE_OPTIONS } from '@/contants/token';

import type { TokenType } from '@/enums/token';

import { Badge } from '@/components/primitives/badge';
import { Input } from '@/components/primitives/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
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
    <div className="flex items-center gap-3 rounded-none border border-border bg-muted/20 px-3 py-2">
      <Badge variant="secondary" className="uppercase">
        Filters
      </Badge>
      <span className="text-xs font-medium text-foreground/80">Name</span>
      <Input
        value={nameQuery}
        onChange={(event) => onNameQueryChange(event.target.value)}
        placeholder="Search token name..."
        className="w-[220px]"
      />
      <span className="text-xs font-medium text-foreground/80">Type</span>
      <Select value={selectedType} onValueChange={onTypeChange} items={FINALIZE_TYPE_OPTION}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {FINALIZE_TYPE_OPTION.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
