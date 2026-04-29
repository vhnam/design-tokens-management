import { createFileRoute } from '@tanstack/react-router';

import { ResendVerificationSuccess } from '@/features/auth/resend-verification-success';

export const Route = createFileRoute('/_public/auth/resend-verification-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResendVerificationSuccess />;
}
