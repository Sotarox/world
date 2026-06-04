'use client';
import { useApi } from '@/api/use-api';

function ProtectedContent() {
  const { data, error, loading } = useApi<{ message: string }>(
    `/auth/test/user`
  );

  return loading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Error: {error.message}</p>
  ) : (
    <div>
      <h2>Login Successful</h2>
      <p className='text-quiet'>{data?.message}</p>
    </div>
  );
}

ProtectedContent.displayName = 'ProtectedContent';
export { ProtectedContent };
