import { Outlet, createFileRoute } from '@tanstack/react-router';

import ProtectedLayout from '@/layouts/protected-layout';

export const Route = createFileRoute('/_protected')({
  component: ProtectedRouteLayout,
});

function ProtectedRouteLayout() {
  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
}
