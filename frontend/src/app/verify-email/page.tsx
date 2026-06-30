import { Suspense } from 'react';
import { ForwardingComponent } from './forwarding-component';

function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ForwardingComponent />
    </Suspense>
  );
}

export default VerifyEmailPage;
