import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

const clientId = process.env.GITHUB_APP_CLIENT_ID;
const clientSecret = process.env.GITHUB_APP_SECRET;

if (!clientId || !clientSecret) throw new Error("Environment variables not set");

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: clientId,
      clientSecret: clientSecret,
      authorization: {
        params: { scope: "read:user user:email notifications public_repo" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token as string;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
});
