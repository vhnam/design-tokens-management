import { createFileRoute } from '@tanstack/react-router';

import { PrimitiveTokens } from '@/features/primitive-tokens';

export const Route = createFileRoute('/_protected/tokens/primitive-tokens')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PrimitiveTokens />;
}
