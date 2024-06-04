import zod from "zod";

const envSchema = zod.object({
    NEXTAUTH_SECRET: zod.string().min(1),
    NEXTAUTH_URL: zod.optional(zod.string().min(1)),
    DISCORD_CLIENT_ID: zod.string().min(1),
    DISCORD_CLIENT_SECRET: zod.string().min(1),
    DISCORD_GUILD_ID: zod.string().min(1),
    DISCORD_ROLE_ID: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
