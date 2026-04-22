import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/lib/auth-client';

import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from '@/components/primitives/breadcrumb';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/primitives/sidebar';

import { AppSidebar } from '@/components/composites/app-sidebar';

export default function ProtectedLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <DotLottieReact src="/animations/loading.lottie" loop autoplay className="size-40" />
      </div>
    );
  }

  if (!session?.user) {
    return <Navigate to="/auth/login" />;
  }

  return (
    <SidebarProvider>
      <AppSidebar session={session} onLogout={() => void authClient.signOut()} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/tokens">Tokens</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
