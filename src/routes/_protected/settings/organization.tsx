import { createFileRoute } from '@tanstack/react-router';

import { Organization } from '@/features/settings/organization';

export const Route = createFileRoute('/_protected/settings/organization')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Organization />;
}
