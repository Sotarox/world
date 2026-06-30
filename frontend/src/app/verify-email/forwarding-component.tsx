'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import api from '@/api/axios';
import { toast } from 'sonner';

function ForwardingComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token !== null && token !== '') {
      api
        .get('/auth/verify-email', { params: { token } })
        .then(() => {
          setIsSuccess(true);
          toast.success('Email verified successfully!');
        })
        .catch((error) => {
          toast.error('Error verifying email: ' + error.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
      setTimeout(() => {
        toast.error('No token found in the URL.');
      }, 500);
    }
  }, [token]);

  return (
    <div>
      {isLoading
        ? 'Verifying email...'
        : isSuccess
          ? 'Email verified successfully! Go to login page'
          : 'Error verifying email.'}
    </div>
  );
}

ForwardingComponent.displayName = 'ForwardingComponent';
export { ForwardingComponent };
