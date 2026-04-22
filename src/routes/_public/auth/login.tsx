import { createFileRoute } from '@tanstack/react-router';

import { Login } from '@/features/auth/login';

export const Route = createFileRoute('/_public/auth/login')({
  component: RouteComponent,
});

function RouteComponent() {
  return <Login />;
}
