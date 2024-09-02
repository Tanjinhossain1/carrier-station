import React from 'react'
import NavbarHelper from './Helper'
import { getServerSession } from 'next-auth';
import { authConfig } from '@/app/api/auth/[...nextauth]/route';

export default async function Navbar() {
    const session = await getServerSession(authConfig);
    const user = session?.user;
  return (
    <NavbarHelper user={user} />
  )
}
