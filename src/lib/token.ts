import { parse } from 'culori';

export function isValidColorValue(value: string) {
  try {
    return parse(value) !== undefined;
  } catch (error) {
    return false;
  }
}
