import { parse } from 'culori';

export function isValidColorToken(value: string) {
  try {
    return parse(value) !== undefined;
  } catch (error) {
    return false;
  }
}
