import { parse } from 'culori';

export function isValidColorValue(value: string) {
  try {
    return parse(value) !== undefined;
  } catch {
    return false;
  }
}

/** Matches `{token.path}` alias syntax for scalar values */
export function isTokenAliasRawValue(value: string) {
  const t = value.trim();
  return t.startsWith('{') && t.endsWith('}');
}
