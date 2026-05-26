'use client';

import { Button } from '@/components/shadcn/button';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className='flex flex-col items-center justify-center gap-4'>
      <h1>Oops, Something went wrong</h1>
      <p>{error.message}</p>
      {/* reset function tells the app to try rendering the component again */}
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
