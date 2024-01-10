import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";
import next from "next";
const users = [
    {
        id: "42",
        email: "test1@example.com",
        password: "123123",
        is_new: true,
    },
    {
        id: "43",
        email: "test2@example.com",
        password: "123123",
        is_new: false,
    },
];

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text",
                    placeholder: "Please Enter Your Username",
                },
                password: {
                    label: "Password",
                    type: "password",
                    placeholder: "Please Enter your Password",
                },
            },
            async authorize(credentials, req) {
                const user = users.find(
                    (u) => u.email === credentials?.email && u.password === credentials.password
                );

                if (user) {
                    return user
                } else {
                    return null;
                }
            },
        }),
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        // signIn: "/SignIn",
        // error: '/AuthError'
    },
    secret: process.env.NEXTAUTH_SECRET as string,
    callbacks: {
        async jwt({ token, user, account, profile, isNewUser }: any) {
            if (account) {
                token.is_new = user?.is_new;
            }
            return token;
        },
        async session({ session, user, token }: any) {
            session.is_new = token?.is_new
            return session;
        },
    },
};
