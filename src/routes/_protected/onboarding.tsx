import { createFileRoute } from '@tanstack/react-router';

import Onboarding from '@/features/system/onboarding';

export const Route = createFileRoute('/_protected/onboarding')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Onboarding />;
}
