import { createFileRoute } from '@tanstack/react-router';

import { ForgotPassword } from '@/features/auth/forgot-password';

export const Route = createFileRoute('/_public/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPassword />;
}
