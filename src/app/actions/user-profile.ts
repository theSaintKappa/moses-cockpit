"use server";

import { env } from "@/env";
import { getServerSession } from "@/server/auth";
import type { RESTGetAPIUserResult } from "discord-api-types/v10";

export default async function getUserProfile(userId: string): Promise<RESTGetAPIUserResult | null> {
    const session = await getServerSession();
    if (!session) return null;

    const url = `https://discord.com/api/v10/users/${userId}`;
    const response = await fetch(url, { headers: { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}` }, next: { revalidate: 3600 } });

    return response.ok ? await response.json() : null;
}
