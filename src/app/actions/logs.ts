import userCheck from "@/app/actions/user-check";
import { connectMongo } from "@/lib/db";
import { CockpitLog } from "@/models/CockpitLog";
import { getServerSession } from "@/server/auth";

export interface Log {
    action: "image-upload";
    metadata: { [key: string]: unknown };
}

async function performAccessCheck() {
    const session = await getServerSession();
    if (!session) return { status: 401, error: "Unauthorized" };

    const check = await userCheck(session.account.access_token);
    if (!check.isMember) return { status: 403, message: "Forbidden" };

    return { status: 200 };
}

export async function createLog(log: Log) {
    const accessCheck = await performAccessCheck();
    if (accessCheck.status !== 200) return accessCheck;

    await connectMongo();

    return await CockpitLog.create(log);
}

export async function getLogs() {
    const accessCheck = await performAccessCheck();
    if (accessCheck.status !== 200) return accessCheck;

    await connectMongo();

    return { status: 200, logs: await CockpitLog.find() };
}
