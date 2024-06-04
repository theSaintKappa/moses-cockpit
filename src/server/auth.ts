import { env } from "@/env";
import type { APIUser } from "discord-api-types/v10";
import { type Account, type DefaultSession, type NextAuthOptions, getServerSession as getServerAuthSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import type { ProviderType } from "next-auth/providers/index";

type Snowflake = string;

declare module "next-auth" {
    interface Session extends DefaultSession {
        account: Account;
        profile: APIUser;
    }

    interface Account {
        provider: string;
        type: ProviderType;
        providerAccountId: Snowflake;
        token_type: string;
        access_token: string;
        expires_at: number;
        refresh_token: string;
        scope: string;
    }
}

export const authOptions: NextAuthOptions = {
    callbacks: {
        jwt({ token, account, profile }) {
            if (account) {
                token.account = account;
                token.profile = profile;
            }
            return token;
        },
        session({ session, token }) {
            session.account = token.account as Account;
            session.profile = token.profile as APIUser;

            return session;
        },
    },
    providers: [
        DiscordProvider({
            clientId: env.DISCORD_CLIENT_ID,
            clientSecret: env.DISCORD_CLIENT_SECRET,
            authorization: { params: { scope: "identify guilds.members.read" } },
        }),
    ],
    pages: {
        signIn: "/",
    },
};

export const getServerSession = () => getServerAuthSession(authOptions);
