import NextAuth from 'next-auth';
import DiscordProvider from 'next-auth/providers/discord';
import User from '@models/User';
import dbConnect from '@lib/db';
import { fetchUserRoles, refreshDiscordTokens } from '@lib/discordAuth';

export default NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'identify email guilds guilds.members.read'
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (user && account) {
        token.userId = user.id;
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = Date.now() + (account.expires_in * 1000);

        if (isNaN(token.expiresAt)) {
          token.expiresAt = Date.now() + (7200 * 1000);
        }

        await dbConnect();
        const roles = await fetchUserRoles(account.access_token);

        await User.updateOne(
          { userId: user.id },
          {
            userId: user.id,
            username: user.name,
            email: user.email,
            accessToken: account.access_token,
            refreshToken: account.refresh_token,
            expiresAt: new Date(token.expiresAt),
            roles
          },
          { upsert: true }
        );
      }

      if (Date.now() > token.expiresAt) {
        const refreshed = await refreshDiscordTokens(token.refreshToken);
        if (refreshed) {
          token.accessToken = refreshed.accessToken;
          token.refreshToken = refreshed.refreshToken;
          token.expiresAt = Date.now() + (refreshed.expiresIn * 1000);
        } else {
          token.error = 'RefreshAccessTokenError';
        }
      }

      return token;
    },
    async session({ session, token }) {
      session.user.id = token.userId;
      session.accessToken = token.accessToken;
      session.expiresAt = token.expiresAt;
      session.error = token.error;
      return session;
    }
  }
});