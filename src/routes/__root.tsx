import { TanStackDevtools } from '@tanstack/react-devtools';
import type { QueryClient } from '@tanstack/react-query';
import { createRootRouteWithContext, HeadContent, Outlet, Scripts, useRouter } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';
import type { PropsWithChildren } from 'react';

import tanstackQueryDevtools from '@/integrations/tanstack-query/devtools';
import TanstackQueryProvider from '@/integrations/tanstack-query/root-provider';

import { Toaster } from '@/components/primitives/sonner';
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
});

function RootDocument({ children }: PropsWithChildren) {
  return (
    <html lang="en">
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
      <Toaster />
      <TooltipProvider>
        <Outlet />
      </TooltipProvider>
      <TanStackDevtools
        config={{
          position: 'bottom-right',
        }}
        plugins={[
          {
            name: 'Tanstack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          tanstackQueryDevtools,
        ]}
      />
    </TanstackQueryProvider>
  );
}
