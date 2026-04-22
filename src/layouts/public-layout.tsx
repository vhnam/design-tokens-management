import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Navigate } from '@tanstack/react-router';
import type { PropsWithChildren } from 'react';

import { authClient } from '@/lib/auth-client';

export default function PublicLayout({ children }: PropsWithChildren) {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <DotLottieReact src="/animations/loading.lottie" loop autoplay className="size-40" />
      </div>
    );
  }

  if (session?.user) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
