import NextAuth from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt, { compare } from 'bcrypt';

const prisma = new PrismaClient();

const handler = NextAuth({
    adapter: PrismaAdapter(prisma),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials: Record<"email" | "password", string> | undefined): Promise<any | null> {
                if (!credentials) {
                    return null;
                }

                // Find the user by email
                const user = await prisma.user.findUnique({
                    where: { email: credentials.email },
                });

                if (user && (await compare(credentials.password, user.password))) {
                    // Return the user object with the expected structure
                    return {
                        id: user.id.toString(), // Convert number to string
                        email: user.email,
                        name: user.fullName,
                        role: user.role,
                    };
                }

                // If no user was found or password didn't match
                return null;
            }
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user }: any) {
            console.log('user  token 1: ', token, user)
            if (user) {
                token.email = user.email;
                token.fullName = user.fullName;
                token.role = user.role;
                token.id = user.id; // Optionally include user ID
            }
            return token;
        },
        async session({ session, token }: any) {
            console.log('user  token 2:  ', token, session)
            session.user.email = token?.email as string;
            session.user.fullName = token?.fullName as string;
            session.user.role = token?.role as string;
            session.user.id = token?.id as string; // Optionally include user ID
            return session;
        },
    },
});

export { handler as GET, handler as POST };
