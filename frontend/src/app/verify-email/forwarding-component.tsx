'use client';

import { useSearchParams } from 'next/navigation';

function ForwardingComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  return <div>{token}</div>;
}

ForwardingComponent.displayName = 'ForwardingComponent';
export { ForwardingComponent };
