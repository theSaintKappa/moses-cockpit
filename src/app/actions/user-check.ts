"use server";

import { env } from "@/env";
import type { APIGuildMember, RESTError } from "discord-api-types/v10";

export type UserCheckResponse = { error: null; isMember: boolean; isClassmate: boolean; isCockpitAdmin: boolean } | { error: RESTError; isMember: false; isClassmate: boolean; isCockpitAdmin: boolean };

export default async function userIdentityCheck(accessToken: string): Promise<UserCheckResponse> {
    const url = `https://discord.com/api/v10/users/@me/guilds/${env.DISCORD_GUILD_ID}/member`;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` }, next: { revalidate: 1 } });

    if (!response.ok) {
        const error: RESTError = await response.json();
        // 10004 Unknown guild
        if (error.code === 10004) return { error: null, isMember: false, isClassmate: false, isCockpitAdmin: false };
        return { error, isMember: false, isClassmate: false, isCockpitAdmin: false };
    }

    const guildsResponse: APIGuildMember = await response.json();
    console.log(guildsResponse);
    return { error: null, isMember: true, isClassmate: guildsResponse.roles?.includes(env.DISCORD_CLASS_ROLE_ID) ?? false, isCockpitAdmin: guildsResponse.roles?.includes(env.DISCORD_COCKPIT_ADMIN_ROLE_ID) ?? false };
}
