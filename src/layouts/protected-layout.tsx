import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { SidebarInset, SidebarProvider } from '@/components/primitives/sidebar';
import { Toaster } from '@/components/primitives/sonner';

import { AppSidebar } from '@/components/composites/sidebar/app-sidebar';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
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
    <>
      <Toaster />
      <SidebarProvider>
        <AppSidebar session={session} onLogout={() => void authClient.signOut()} />
        <SidebarInset>
          <div className="flex flex-1 flex-col gap-4 p-4 md:p-6">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
