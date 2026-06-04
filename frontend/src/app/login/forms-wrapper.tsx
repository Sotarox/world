'use client';

import { useAuthStore } from '@/store/auth-store';
import { useState } from 'react';
import { LoginForm } from './login-form';

function FormsWrapper() {
  const { isLoggedIn } = useAuthStore();
  const [showSignUp, setShowSignUp] = useState(false);

  if (isLoggedIn) {
    return <p>Already logged in</p>;
  }

  return showSignUp ? (
    <div>
      <h2>Sign Up</h2>
    </div>
  ) : (
    <div>
      <h2>Login</h2>
      <LoginForm />
      <p>
        Don&apos;t have an account?{' '}
        <button onClick={() => setShowSignUp(true)}>Sign Up</button>
      </p>
    </div>
  );
}

export default FormsWrapper;
