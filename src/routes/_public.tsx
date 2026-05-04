import { Outlet, createFileRoute } from '@tanstack/react-router';

import { PublicLayout } from '@/layouts/public-layout';

export const Route = createFileRoute('/_public')({
  component: PublicRouteLayout,
});

function PublicRouteLayout() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}
