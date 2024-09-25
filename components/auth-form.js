'use client';
import Link from 'next/link';
import { useFormState } from 'react-dom';

import { auth } from '@/actions/auth-actions';
import { useState } from 'react';

export default function AuthForm({ mode }) {
  const [formState, formAction] = useFormState(auth.bind(null, mode), {});
  const [showPassword, setShowPassword] = useState(false);
  const isLoginMode = mode === 'login';
  return (
    <form id="auth-form" action={formAction}>
      <div>
        <img src="/images/auth-icon.jpg" alt="A lock icon" />
      </div>
      <p>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </p>
      <p>
        <label htmlFor="password">Password</label>
        <span style={{ display: 'flex', alignItems: 'center' }}>
          <input type={showPassword ? 'text' : 'password'} name="password" id="password" style={{ flex: 1 }} />
          <button type="button" onClick={() => setShowPassword((prev) => !prev)} style={{ marginLeft: '8px' }}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </span>
      </p>
      {!isLoginMode && (
        <p>
          <label htmlFor="firstName">First Name</label>
          <input type="firstName" name="firstName" id="email" />
        </p>
      )}
      {!isLoginMode && (
        <p>
          <label htmlFor="lastName">Last Name</label>
          <input type="lastName" name="lastName" id="email" />
        </p>
      )}
      {formState.errors && (
        <ul id="form-errors">
          {Object.keys(formState.errors).map((error) => (
            <li key={error}>{formState.errors[error]}</li>
          ))}
        </ul>
      )}
      <p>
        <button type="submit">{isLoginMode ? 'Login' : 'Create Account'}</button>
      </p>
      <p>
        {isLoginMode && <Link href="/?mode=signup">Create an account.</Link>}
        {!isLoginMode && <Link href="/?mode=login">Login with existing account.</Link>}
      </p>
    </form>
  );
}
