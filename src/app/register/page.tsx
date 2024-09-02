import React from 'react'
import { getServerSession } from 'next-auth';
import { authConfig } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Register from './_components/Register';
import Navbar from '@/components/Navbar';

export default async function page() {
  
  const session = await getServerSession(authConfig);
  const user = session?.user;
  if(user?.email){
    redirect('/')
  }
  return (
  <div className='bg-white'>
   <Navbar />
   <Register />
   </div>
  )
}
