import { createFileRoute } from '@tanstack/react-router';

import { ResendVerification } from '@/features/auth/resend-verification';

export const Route = createFileRoute('/_public/auth/resend-verification')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResendVerification />;
}
