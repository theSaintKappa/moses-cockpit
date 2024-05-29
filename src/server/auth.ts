import { type Account, type DefaultSession, type NextAuthOptions, type Profile, getServerSession as getServerAuthSession } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import type { ProviderType } from "next-auth/providers/index";

declare module "next-auth" {
    interface Session extends DefaultSession {
        account: Account;
        profile: Profile;
    }

    interface Account {
        provider: string;
        type: ProviderType;
        providerAccountId: string;
        token_type: string;
        access_token: string;
        expires_at: number;
        refresh_token: string;
        scope: string;
    }

    interface Profile {
        id: string;
        username: string;
        avatar: string;
        discriminator: string;
        public_flags: number;
        flags: number;
        banner: string;
        accent_color: string | null;
        global_name: string;
        avatar_decoration_data: string | null;
        banner_color: string | null;
        clan: string | null;
        mfa_enabled: boolean;
        locale: string;
        premium_type: number;
        email?: string;
        verified: boolean;
        image_url: string;
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
            session.profile = token.profile as Profile;

            return session;
        },
    },
    providers: [
        DiscordProvider({
            clientId: process.env.DISCORD_CLIENT_ID as string,
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string,
        }),
    ],
    pages: {
        signIn: "/",
    },
};

export const getServerSession = () => getServerAuthSession(authOptions);
