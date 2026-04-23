import { createFileRoute } from '@tanstack/react-router';

import { ComponentTokens } from '@/features/component-tokens';

export const Route = createFileRoute('/_protected/tokens/component-tokens')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ComponentTokens />;
}
