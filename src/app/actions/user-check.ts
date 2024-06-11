"use server";

import { env } from "@/env";
import type { APIGuildMember, RESTError } from "discord-api-types/v10";

export default async function userCheck(accessToken: string) {
    const url = `https://discord.com/api/users/@me/guilds/${env.DISCORD_GUILD_ID}/member`;
    const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` }, next: { revalidate: 2 } });

    if (!response.ok) {
        const error: RESTError = await response.json();
        // 10004 Unknown guild
        if (error.code === 10004) return { error: null, isMember: false, hasRole: false };
        return { error, isMember: false, hasRole: false };
    }

    const guildsResponse: APIGuildMember = await response.json();
    return { error: null, isMember: true, hasRole: guildsResponse.roles?.includes(env.DISCORD_ROLE_ID) };
}
