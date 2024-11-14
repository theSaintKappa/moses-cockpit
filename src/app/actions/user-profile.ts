"use server";

import { env } from "@/env";
import type { APIUserProfile } from "@/lib/types";
import { getServerSession } from "@/server/auth";

const fetchedProfiles = new Map<string, APIUserProfile>();

export async function getUserProfile(userId: string): Promise<APIUserProfile | null> {
    const session = await getServerSession();
    if (!session) return null;

    if (fetchedProfiles.has(userId)) return fetchedProfiles.get(userId) || null;

    const url = `https://discord.com/api/v10/users/${userId}`;
    const response = await fetch(url, { headers: { Authorization: `Bot ${env.DISCORD_BOT_TOKEN}` }, next: { revalidate: 900 } });

    let profile = await response.json();
    profile = { ...profile, avatar_url: `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}` };

    fetchedProfiles.set(userId, profile);

    return response.ok ? profile : null;
}

export const getUserProfileCache = async () => fetchedProfiles;
