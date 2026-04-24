import { Navigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { useGetWorkspacesQuery } from '@/queries/workspaces';

import { useWorkspaceStore } from '@/stores/workspace.store';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { SidebarInset, SidebarProvider } from '@/components/primitives/sidebar';

import { AppSidebar } from '@/components/composites/sidebar/app-sidebar';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  const { data: workspaces, isPending: isWorkspacesPending } = useGetWorkspacesQuery();
  const { activeWorkspace, setActiveWorkspace } = useWorkspaceStore();

  useEffect(() => {
    if (!activeWorkspace && workspaces && workspaces.length > 0) {
      setActiveWorkspace(workspaces[0]);
    }
  }, [activeWorkspace, workspaces, setActiveWorkspace]);

  if (isPending || isWorkspacesPending) {
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
      <AppSidebar session={session} workspaces={workspaces} onLogout={() => void authClient.signOut()} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
