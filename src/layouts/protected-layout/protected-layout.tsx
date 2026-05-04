import { Navigate, useLocation, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { useGetWorkspacesQuery } from '@/queries/workspaces';

import type { Workspace } from '@/types/workspace';

import { useWorkspaceStore } from '@/stores/workspace.store';

import { AppSidebar } from '@/layouts/protected-layout/app-sidebar';
import { DashboardSidebar } from '@/layouts/protected-layout/dashboard-sidebar';

import { WorkspaceAddDialog } from '@/features/workspaces';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { SidebarInset, SidebarProvider } from '@/components/primitives/sidebar';

const allowedDashboardLayouts = ['/settings/account', '/settings/members', '/settings/projects', '/settings/workspace'];

export const ProtectedLayout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const navigate = useNavigate();

  const { data: session, isPending } = authClient.useSession();

  const isOnboarding = location.pathname === '/onboarding';

  const { data: workspaces, isPending: isWorkspacesPending } = useGetWorkspacesQuery({
    enabled: !isOnboarding,
  });
  const { activeWorkspace, setActiveWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (!session?.user) return;

    if (!workspaces || workspaces.length === 0) {
      navigate({ to: '/onboarding', replace: true });
      return;
    }

    if (!activeWorkspace) {
      setActiveWorkspace(workspaces[0]);
      return;
    }

    const nextActiveWorkspace =
      (workspaces as Workspace[]).find((workspace) => workspace.id === activeWorkspace.id) ?? null;
    if (!nextActiveWorkspace) {
      setActiveWorkspace(workspaces[0]);
      return;
    }

    if (
      nextActiveWorkspace.name !== activeWorkspace.name ||
      nextActiveWorkspace.image !== activeWorkspace.image ||
      nextActiveWorkspace.brands !== activeWorkspace.brands ||
      nextActiveWorkspace.themes !== activeWorkspace.themes
    ) {
      setActiveWorkspace(nextActiveWorkspace);
    }
  }, [activeWorkspace, workspaces, setActiveWorkspace]);

  const renderSidebar = () => {
    const isAllowedDashboardLayout = allowedDashboardLayouts.includes(location.pathname);
    if (isAllowedDashboardLayout && session?.user) {
      return <DashboardSidebar session={session!} workspaces={workspaces} onLogout={() => void authClient.signOut()} />;
    }
    return <AppSidebar session={session!} onLogout={() => void authClient.signOut()} />;
  };

  if (isPending || (isWorkspacesPending && !isOnboarding)) {
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

      <WorkspaceAddDialog />
    </SidebarProvider>
  );
};
