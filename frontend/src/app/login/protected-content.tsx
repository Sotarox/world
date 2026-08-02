'use client';
import api from '@/api/axios';
import { useQuery } from '@tanstack/react-query';

function ProtectedContent() {
  const { data, error, isPending, isError } = useQuery({
    queryKey: ['auth', 'test', 'protected'],
    queryFn: () =>
      api
        .get<{ message: string }>('/auth/test/protected')
        .then((res) => res.data),
    retry: false,
  });

  return isPending ? (
    <p>Loading...</p>
  ) : isError ? (
    <p>Error: {error?.message}</p>
  ) : (
    <div>
      <h2>Login Successful</h2>
      <p className='text-quiet'>{data?.message}</p>
    </div>
  );
}

ProtectedContent.displayName = 'ProtectedContent';
export { ProtectedContent };
