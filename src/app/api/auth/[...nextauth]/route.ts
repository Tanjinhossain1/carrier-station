import NextAuth, { NextAuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt, { compare } from 'bcrypt';

const prisma = new PrismaClient();

export const authConfig: NextAuthOptions = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Sign in',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }
            
                // Find the user by email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });
            
                if (user && (await compare(credentials.password, user.password))) {
                    console.log('Authorized user:', user); // Debugging line
            
                    return {
                        id: user.id.toString(),
                        email: user.email,
                        fullName: user.fullName,
                        role: user.role, // Ensure role is included here
                    };
                }
            
                return null;
            }            
        }),
    ],
    callbacks: {
        async jwt({ token, user }: any) {
            if (user) {
                token.email = user.email;
                token.fullName = user.fullName;
                token.role = user.role;
                token.id = user.id;
                console.log('JWT token:', token); // Debugging line
            }
            return token;
        },        
        async session({ session, token }: any) {
            session.user.email = token?.email as string;
            session.user.fullName = token?.fullName as string;
            session.user.role = token?.role as string; // Ensure role is set here
            session.user.id = token?.id as string;
            console.log('Session:', session); // Debugging line
            return session;
        }
        
    },
});

export { authConfig as GET, authConfig as POST };
