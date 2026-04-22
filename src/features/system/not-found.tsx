import { Link } from '@tanstack/react-router';

import { Button } from '@/components/primitives/button';
import { LottiePlayer } from '@/components/primitives/lottie-player';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex items-center justify-center">
        <LottiePlayer src="/animations/error-404.lottie" className="size-96" />
      </div>
      <Button nativeButton={false} render={<Link to="/">Back to Home</Link>} />
    </div>
  );
};

export default NotFound;
