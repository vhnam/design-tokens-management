import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import type { Session } from '@/lib/auth';
import { authClient } from '@/lib/auth-client';

import { Separator } from '@/components/primitives/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/primitives/sidebar';

import { AppSidebar } from '@/components/composites/app-sidebar';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session as Session} onLogout={() => void authClient.signOut()} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
