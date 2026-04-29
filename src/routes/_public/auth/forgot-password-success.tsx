import { createFileRoute } from '@tanstack/react-router';

import { ForgotPasswordSuccess } from '@/features/auth/forgot-password-success';

export const Route = createFileRoute('/_public/auth/forgot-password-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return <ForgotPasswordSuccess />;
}
