import NextAuth, { User } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        if (
          process.env.ADMIN_EMAIL &&
          process.env.ADMIN_PASSWORD === credentials.password
        ) {
          return {
            email: process.env.ADMIN_EMAIL,
            name: process.env.ADMIN_NAME,
          } as User;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
  ],
});

export { handler as GET, handler as POST };
