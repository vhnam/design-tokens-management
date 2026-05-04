import { createFileRoute } from '@tanstack/react-router';

import { Workspace } from '@/features/settings/workspace';

export const Route = createFileRoute('/_protected/settings/workspace')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Workspace />;
}
