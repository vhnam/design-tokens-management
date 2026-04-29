import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { authClient } from '@/integrations/better-auth/auth-client';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';
import { LottiePlayer } from '@/components/primitives/lottie-player';

export const VerifyEmail = () => {
  const navigate = useNavigate();

  const [isInvalidToken, setIsInvalidToken] = useState(false);

  const handleVerifyEmail = async (token: string) => {
    const { error } = await authClient.verifyEmail({ query: { token } });
    if (error) {
      toast.error('Unable to verify email. Please try again.');
      setIsInvalidToken(true);
      return;
    }
    toast.success('Email verified successfully');
    await navigate({ to: '/auth/login', replace: true });
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      handleVerifyEmail(token);
    } else {
      setIsInvalidToken(true);
    }
  }, []);

  if (isInvalidToken) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl font-heading">Invalid token</CardTitle>
          </CardHeader>
          <CardContent>
            <p>The verification link is invalid or expired. Please request a new verification link.</p>
          </CardContent>
          <CardFooter>
            <Button type="button" className="w-full" onClick={() => navigate({ to: '/auth/resend-verification' })}>
              Resend verification link
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <LottiePlayer src="/animations/loading.lottie" loop autoplay className="size-96" />
    </div>
  );
};
