import { createFileRoute } from '@tanstack/react-router';

import { VerifyEmail } from '@/features/auth/verify-email';

export const Route = createFileRoute('/_public/auth/verify-email')({
  component: RouteComponent,
});

function RouteComponent() {
  return <VerifyEmail />;
}
