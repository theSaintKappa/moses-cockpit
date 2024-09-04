"use server";

import userCheck from "@/app/actions/user-check";
import { env } from "@/env";
import { getServerSession } from "@/server/auth";
import { Storage } from "@google-cloud/storage";
import { customAlphabet } from "nanoid";

const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8);

const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

export default async function generateSignedURL(contentType: string) {
    const session = await getServerSession();
    if (!session) return { status: 401, error: "Unauthorized" };

    const check = await userCheck(session.account.access_token);
    if (!check.isMember || !check.isClassmate) return { status: 403, message: "Forbidden" };

    if (!allowedTypes.includes(contentType)) return { status: 400, message: "Invalid content type" };

    const storage = new Storage({ projectId: env.GCP_PROJECT_ID, credentials: { client_email: env.GCP_SERVICE_ACCOUNT_EMAIL, private_key: env.GCP_PRIVATE_KEY } });
    const bucket = storage.bucket(env.GCP_BUCKET_NAME);

    const id = nanoid();

    const [url] = await bucket.file(`test/${id}`).getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
        contentType,
        // extensionHeaders: {
        //     "x-goog-content-length-range": "0,10485760", // 10MB
        // },
    });

    return { status: 200, message: "OK", url, id };
}
