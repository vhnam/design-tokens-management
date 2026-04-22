import { createFileRoute } from '@tanstack/react-router';

import { Register } from '@/features/auth/register';

export const Route = createFileRoute('/_public/auth/register')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Register />;
}
