import { useContext } from 'react';

import { ThemeProviderContext } from '@/lib/theme';

export const useTheme = () => {
  return useContext(ThemeProviderContext);
};
