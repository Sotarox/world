'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/api/axios';
import { toast } from 'sonner';

function ForwardingComponent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const hasToken = token != null && token !== '';
  const shownNoTokenToastRef = useRef(false);
  const shownSuccessToastRef = useRef(false);
  const shownErrorToastRef = useRef(false);

  const { isPending, isSuccess, isError, error } = useQuery({
    queryKey: ['verify-email', token],
    queryFn: () => api.get('/auth/verify-email', { params: { token } }),
    enabled: hasToken,
    retry: false,
    staleTime: Number.POSITIVE_INFINITY,
  });

  useEffect(() => {
    shownSuccessToastRef.current = false;
    shownErrorToastRef.current = false;
  }, [token]);

  useEffect(() => {
    if (!hasToken && !shownNoTokenToastRef.current) {
      shownNoTokenToastRef.current = true;
      setTimeout(() => {
        toast.error('No token found in the URL.');
      }, 500);
    }
  }, [hasToken]);

  useEffect(() => {
    if (isSuccess && !shownSuccessToastRef.current) {
      shownSuccessToastRef.current = true;
      toast.success('Email verified successfully!');
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError && !shownErrorToastRef.current) {
      shownErrorToastRef.current = true;
      const message = (error as { message?: string } | null)?.message;
      toast.error('Error verifying email: ' + (message ?? 'Unknown error'));
    }
  }, [isError, error]);

  const isLoading = hasToken && isPending;

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
