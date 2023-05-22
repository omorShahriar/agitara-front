import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // You need to provide your own logic here that takes the credentials
        // submitted and returns either a object representing a user or value
        // that is false/null if the credentials are invalid.
        // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
        // You can also use the `req` object to obtain additional parameters
        // (i.e., the request IP address)
        if (credentials == null) return null;

        const res = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_API_URL}/api/auth/local`,
          {
            method: "POST",
            body: JSON.stringify({
              identifier: credentials.email,
              password: credentials.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );

        const data = await res.json();
        console.log({ data });
        if (data.error) {
          throw new Error(data.error.message);
        }
        const { user, jwt } = data;
        return { ...user, jwt };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;

      if (isSignIn) {
        token.id = user.id;
        token.jwt = user.jwt;
        token.username = user.username;
      }
      return Promise.resolve(token);
    },
    // test
    async session({ session, token }) {
      session.id = token.id;
      session.jwt = token.jwt;
      session.user.name = token.username;

      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};

export default NextAuth(authOptions);
