// app/login/page.tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Snackbar from '@/components/Snackbar';
import { signIn } from 'next-auth/react';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

export default function LoginPage() {
  const [showSnackbar, setShowSnackbar] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data:any) => {
    try {
      const response = await fetch(`/api/check-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: data.email }),
      });

      const { exists } = await response.json();

      if (!exists) {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
        return;
      }

      const signInResponse = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (signInResponse?.error) {
        setShowSnackbar(true);
        setTimeout(() => setShowSnackbar(false), 3000);
      } else {
        reset();
        window.location.href = '/';
      }
    } catch (error) {
      setShowSnackbar(true);
      setTimeout(() => setShowSnackbar(false), 3000);
    }
  };

  const onClose = ()=>{
    setShowSnackbar(false)
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Snackbar onClose={onClose} message="Login failed. Email does not exist or incorrect password." show={showSnackbar} />
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            {...register('email')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            {...register('password')}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <p className="text-red-500">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Login
        </button>
      </form>
    </div>
  );
}
