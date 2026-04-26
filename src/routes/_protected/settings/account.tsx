import { createFileRoute } from '@tanstack/react-router';

import { Account } from '@/features/settings/account';

export const Route = createFileRoute('/_protected/settings/account')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Account />;
}
