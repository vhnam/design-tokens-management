import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';

export const ResendVerificationSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Verification email sent</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Please check your inbox for a verification link.</p>
        </CardContent>
        <CardFooter>
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => navigate({ to: '/auth/login', replace: true })}
          >
            Back to Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
