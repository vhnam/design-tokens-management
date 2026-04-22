'use client';

import { Suspense, lazy } from 'react';

import { cn } from '@/lib/utils';

const DotLottieReact = lazy(async () => {
  const module = await import('@lottiefiles/dotlottie-react');
  return { default: module.DotLottieReact };
});

type LottiePlayerProps = {
  src: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
};

export function LottiePlayer({ src, loop = true, autoplay = true, className }: LottiePlayerProps) {
  return (
    <Suspense fallback={<div className={cn('animate-pulse rounded bg-muted/30', className)} />}>
      <DotLottieReact src={src} loop={loop} autoplay={autoplay} className={cn('pointer-events-none', className)} />
    </Suspense>
  );
}
