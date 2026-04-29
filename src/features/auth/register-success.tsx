import { useNavigate } from '@tanstack/react-router';

import { Button } from '@/components/primitives/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/primitives/card';

export const RegisterSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-heading">Account created successfully</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Account created successfully. Please check your email for verification.</p>
        </CardContent>
        <CardFooter>
          <Button type="button" className="w-full" onClick={() => navigate({ to: '/auth/login' })}>
            Login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
