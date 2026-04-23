import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/tokens/component-tokens')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/tokens/component-tokens"!</div>;
}
