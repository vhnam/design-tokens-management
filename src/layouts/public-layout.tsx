import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { LottiePlayer } from '@/components/primitives/lottie-player';
import { Toaster } from '@/components/primitives/sonner';

export default function PublicLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LottiePlayer src="/animations/loading.lottie" className="size-40" />
      </div>
    );
  }

  if (session?.user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <Toaster />
      {children}
    </>
  );
}
