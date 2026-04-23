import type { QueryClient } from '@tanstack/react-query';
import { HeadContent, Outlet, Scripts, createRootRouteWithContext, useRouter } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { TanstackQueryProvider } from '@/integrations/tanstack-query';

import { ThemeProvider } from '@/lib/theme';

import NotFound from '@/features/system/not-found';

import { TooltipProvider } from '@/components/primitives/tooltip';

import appCss from '@/styles.css?url';

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'Design Tokens Management',
      },
    ],
    links: [
      {
        rel: 'stylesheet',
        href: appCss,
      },
    ],
  }),
  component: RootComponent,
  shellComponent: RootDocument,
  notFoundComponent: NotFound,
});

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { options } = useRouter();

  return (
    <TanstackQueryProvider queryClient={options.context.queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="theme">
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
      </ThemeProvider>
    </TanstackQueryProvider>
  );
}
