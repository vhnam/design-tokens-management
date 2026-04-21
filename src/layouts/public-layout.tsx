import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/lib/auth-client';

export default function PublicLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  if (session?.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
