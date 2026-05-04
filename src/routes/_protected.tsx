import { Outlet, createFileRoute, useLocation } from '@tanstack/react-router';

import { ProtectedLayout } from '@/layouts/protected-layout';

export const Route = createFileRoute('/_protected')({
  component: ProtectedRouteLayout,
});

function ProtectedRouteLayout() {
  const location = useLocation();

  const isOnboarding = location.pathname === '/onboarding';

  if (isOnboarding) {
    return <Outlet />;
  }

  return (
    <ProtectedLayout>
      <Outlet />
    </ProtectedLayout>
  );
}
