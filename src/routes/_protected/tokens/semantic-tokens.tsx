import { createFileRoute } from '@tanstack/react-router';

import { SemanticTokens } from '@/features/semantic-tokens/semantic-tokens';

export const Route = createFileRoute('/_protected/tokens/semantic-tokens')({
  component: RouteComponent,
});

function RouteComponent() {
  return <SemanticTokens />;
}
