"use server";

import userCheck from "@/app/actions/user-check";
import { env } from "@/env";
import { MAX_FILE_SIZE } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "@/server/auth";
import { Storage } from "@google-cloud/storage";
import { customAlphabet, nanoid } from "nanoid";

const generateId = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz", 8);

const allowedTypes = ["image/png", "image/jpeg", "image/gif", "image/webp"];

export async function generateSignedURL(contentType: string, imageSize: number, dimensions: { width: number; height: number }) {
    const session = await getServerSession();
    if (!session) return { status: 401, error: "Unauthorized" };

    const check = await userCheck(session.account.access_token);
    if (!check.isMember) return { status: 403, message: "Forbidden" };

    if (!allowedTypes.includes(contentType)) return { status: 415, message: "Invalid content type" };

    if (imageSize > MAX_FILE_SIZE) return { status: 413, message: "File too large" };

    const storage = new Storage({ projectId: env.GCP_PROJECT_ID, credentials: { client_email: env.GCP_SERVICE_ACCOUNT_EMAIL, private_key: env.GCP_PRIVATE_KEY } });
    const bucket = storage.bucket(env.GCP_BUCKET_NAME);

    const id = generateId();
    const token = nanoid();

    const [url] = await bucket.file(`moses/${id}`).getSignedUrl({
        version: "v4",
        action: "write",
        expires: Date.now() + 5 * 60 * 1000, // 5 minutes
        contentType,
        extensionHeaders: { "X-Upload-Content-Length": imageSize.toString(), "X-Goog-Content-Length-Range": `0,${imageSize}` },
    });

    const cdnUrl = `https://${env.GCP_BUCKET_NAME}/moses/${id}`;

    await prisma.cockpitPicToken.create({ data: { picId: id, url: cdnUrl, submitterId: session.profile.id, size: imageSize, dimensions, contentType, token } });

    return { status: 200, message: "Success", url, id, cdnUrl, token };
}

export async function verifyToken(id: string, token: string) {
    const storedToken = await prisma.cockpitPicToken.findUnique({ where: { picId: id, token } });
    if (!storedToken || storedToken.token !== token) return false;

    const { submitterId, size, dimensions, contentType } = storedToken;

    const url = `https://${env.GCP_BUCKET_NAME}/moses/${id}`;
    await prisma.mosesPic.create({ data: { picId: id, url, submitterId, size, dimensions, contentType } });
    await prisma.cockpitPicToken.delete({ where: { picId: id } });
    await prisma.cockpitLog.create({ data: { action: "image_upload", invokerId: submitterId, metadata: { url, id } } });

    return true;
}
