import { Navigate, useLocation, useNavigate } from '@tanstack/react-router';
import type { Organization } from 'better-auth/client/plugins';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { useOrganizationStore } from '@/stores/organization.store';

import { AppSidebar } from '@/layouts/protected-layout/app-sidebar';
import { DashboardSidebar } from '@/layouts/protected-layout/dashboard-sidebar';

// import { OrganizationAddDialog } from '@/features/organizations';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { SidebarInset, SidebarProvider } from '@/components/primitives/sidebar';

const allowedDashboardLayouts = [
  '/settings/account',
  '/settings/members',
  '/settings/projects',
  '/settings/organization',
];

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: session, isPending } = authClient.useSession();

  const isOnboarding = location.pathname === '/onboarding';

  const { data: organizations, isPending: isOrganizationsPending } = authClient.useListOrganizations();
  const { activeOrganization, setActiveOrganization } = useOrganizationStore();

  useEffect(() => {
    if (!session?.user) return;

    if (!organizations || organizations.length === 0) {
      navigate({ to: '/onboarding', replace: true });
      return;
    }

    if (!activeOrganization) {
      setActiveOrganization(organizations[0]);
      return;
    }

    const nextActiveOrganization =
      (organizations as Organization[]).find((organization) => organization.id === activeOrganization.id) ?? null;
    if (!nextActiveOrganization) {
      setActiveOrganization(organizations[0]);
      return;
    }

    if (nextActiveOrganization.name !== activeOrganization.name) {
      setActiveOrganization(nextActiveOrganization);
    }
  }, [activeOrganization, organizations, setActiveOrganization]);

  const renderSidebar = () => {
    const isAllowedDashboardLayout = allowedDashboardLayouts.includes(location.pathname);
    if (isAllowedDashboardLayout && session?.user) {
      return (
        <DashboardSidebar session={session} organizations={organizations!} onLogout={() => void authClient.signOut()} />
      );
    }
    return <AppSidebar session={session!} onLogout={() => void authClient.signOut()} />;
  };

  if (isPending || (isOrganizationsPending && !isOnboarding)) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LottiePlayer src="/animations/loading.lottie" className="size-40" />
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <SidebarProvider>
      {renderSidebar()}
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>

      {/* <OrganizationAddDialog /> */}
    </SidebarProvider>
  );
};
