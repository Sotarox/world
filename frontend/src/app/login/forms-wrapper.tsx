'use client';

import { useAuthStore } from '@/store/auth-store';
import { useState } from 'react';
import { LoginForm } from './login-form';
import { SignupForm } from './signup-form';
import { Button } from '@/components/custom/button';
import { ProtectedContent } from './protected-content';

function FormsWrapper() {
  const { isLoggedIn } = useAuthStore();
  const [showSignUp, setShowSignUp] = useState(false);

  if (isLoggedIn) {
    return <ProtectedContent />;
  }

  return (
    <div className='flex flex-col gap-2'>
      {showSignUp ? (
        <div>
          <SignupForm />
          <div className='flex items-center gap-2'>
            <p>Already have an account? </p>
            <Button
              variant='link'
              className='p-0'
              onClick={() => setShowSignUp(false)}
            >
              Login
            </Button>
          </div>
        </div>
      ) : (
        <div>
          <LoginForm />
          <div className='flex items-center gap-2'>
            <p>Don&apos;t have an account? </p>
            <Button
              variant='link'
              className='p-0'
              onClick={() => setShowSignUp(true)}
            >
              Sign Up
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default FormsWrapper;
