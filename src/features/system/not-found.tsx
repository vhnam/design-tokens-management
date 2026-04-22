import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from '@tanstack/react-router';

import { Button } from '@/components/primitives/button';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <DotLottieReact src="/animations/error-404.lottie" loop autoplay className="size-96" />
      </div>
      <Button nativeButton={false} render={<Link to="/">Back to Home</Link>} />
    </div>
  );
};

export default NotFound;
