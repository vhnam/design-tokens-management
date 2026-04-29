import { createFileRoute } from '@tanstack/react-router';

import { RegisterSuccess } from '@/features/auth/register-success';

export const Route = createFileRoute('/_public/auth/register-success')({
  component: RouteComponent,
});

function RouteComponent() {
  return <RegisterSuccess />;
}
