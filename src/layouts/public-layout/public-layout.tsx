import { Navigate, useLocation } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/integrations/better-auth/auth-client';

import { LottiePlayer } from '@/components/primitives/lottie-player';

export const PublicLayout = ({ children }: PropsWithChildren) => {
  const { data: session, isPending } = authClient.useSession();
  const location = useLocation();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LottiePlayer src="/animations/loading.lottie" className="size-40" />
      </div>
    );
  }

  if (session?.user && location.pathname !== '/auth/register-success') {
    return <Navigate to="/settings/projects" />;
  }

  return <>{children}</>;
};
