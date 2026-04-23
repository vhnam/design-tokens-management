import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_protected/settings/workspaces')({
  component: RouteComponent,
});

function RouteComponent() {
  return <div>Hello "/_protected/settings/workspaces"!</div>;
}
