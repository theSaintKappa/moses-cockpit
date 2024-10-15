import zod from "zod";

const envSchema = zod.object({
    NEXTAUTH_SECRET: zod.string().min(1),
    NEXTAUTH_URL: zod.optional(zod.string().min(1)),

    DISCORD_CLIENT_ID: zod.string().min(1),
    DISCORD_CLIENT_SECRET: zod.string().min(1),

    DISCORD_GUILD_ID: zod.string().min(1),
    DISCORD_CLASS_ROLE_ID: zod.string().min(1),
    DISCORD_COCKPIT_ADMIN_ROLE_ID: zod.string().min(1),

    GCP_PROJECT_ID: zod.string().min(1),
    GCP_SERVICE_ACCOUNT_EMAIL: zod.string().email().min(1),
    GCP_PRIVATE_KEY: zod
        .string()
        .min(1)
        .transform((v) => v.replace(/\\n/g, "\n")),
    GCP_BUCKET_NAME: zod.string().min(1),

    MONGO_URI: zod.string().min(1),
});

export const env = envSchema.parse(process.env);
