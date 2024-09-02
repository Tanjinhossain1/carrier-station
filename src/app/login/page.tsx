import React from 'react'
import LoginPage from './_components/Login'
import { getServerSession } from 'next-auth';
import { authConfig } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Navbar from '@/components/Navbar';

export default async function page() {
  
  const session = await getServerSession(authConfig);
  const user = session?.user;
  if(user?.email){
    redirect('/')
  }
  return (
  <>
  <Navbar />
  <LoginPage />
  </>
  )
}
