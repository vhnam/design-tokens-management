import { createFileRoute } from '@tanstack/react-router';

import { Help } from '@/features/system/help';

export const Route = createFileRoute('/_protected/help')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Help />;
}
