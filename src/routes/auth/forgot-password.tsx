import { createFileRoute } from '@tanstack/react-router';

import { Card, CardHeader, CardTitle } from '@/components/primitives/card';

export const Route = createFileRoute('/auth/forgot-password')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Forgot Password</CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}
