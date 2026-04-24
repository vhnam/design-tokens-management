import { createFileRoute } from '@tanstack/react-router';

import { Workspaces } from '@/features/workspaces';

export const Route = createFileRoute('/_protected/settings/workspaces')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Workspaces />;
}
