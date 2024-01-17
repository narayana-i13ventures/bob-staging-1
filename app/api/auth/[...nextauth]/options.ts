import { NextAuthOptions, getServerSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
const users = [
  {
    id: "42",
    email: "test1@example.com",
    password: "123123",
    is_new: true,
  },
  {
    id: "3",
    email: "jhondave@example.com",
    password: "123123",
    name: "Jhon Dave",
  },
];

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
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
          (u) =>
            u.email === credentials?.email &&
            u.password === credentials.password
        );

        if (user) {
          return user;
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
    async signIn({ user, account, profile, email, credentials }: any) {
      if (user) {
        try {
          const response = await fetch(
            `${process.env.API_URL}/v1/users/getuser?email=${user.email}`
          );
          if (response.ok) {
            const userData = await response.json();
            console.log(userData);

            if (userData?.user?.[0]?.length === 0) {
              try {
                const create_user_response = await fetch(
                  `${process.env.API_URL}/v1/users/createuser`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      firstname: user?.name?.split(" ")?.[0] || user?.name,
                      lastname: user?.name?.split(" ")?.[1] || "",
                      preferred_name: user?.name,
                      email: user?.email,
                      image: user?.image,
                    }),
                  }
                );

                if (create_user_response?.ok) {
                  const data: any = await create_user_response?.json();
                  user.user_id = data?.user?.user_id;
                  user.is_new = true;
                  return true;
                } else {
                  return false;
                }
              } catch (error) {
                return false;
              }
            } else {
              user.is_new = false;
              user.user_id = userData?.user?.[0]?.[0]?.user_id;
              return true;
            }
          } else {
            console.error(
              `Failed to fetch user data. Status: ${response.status}`
            );
            return false;
          }
        } catch (error) {
          return false;
        }
      } else {
        return false;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (account) {
        token.is_new = user?.is_new;
        token.user_id = user?.user_id;
      }
      return token;
    },
    async session({ session, user, token }: any) {
      session.user.is_new = token?.is_new;
      session.user.user_id = token?.user_id;
      return session;
    },
    async redirect({ url, baseUrl }: any) {
      const data = await getServerSession();
      return baseUrl;
    },
  },
};
