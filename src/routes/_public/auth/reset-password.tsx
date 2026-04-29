import { createFileRoute } from '@tanstack/react-router';

import { ResetPassword } from '@/features/auth/reset-password';

export const Route = createFileRoute('/_public/auth/reset-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ResetPassword />;
}
