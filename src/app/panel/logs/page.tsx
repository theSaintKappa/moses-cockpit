import getUserProfile from "@/app/actions/user-profile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import { ScrollText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Logs",
};

export default async function Page() {
    const logsResponse = await prisma.cockpitLog.findMany({ orderBy: { createdAt: "desc" } });

    const groupedLogs = logsResponse.reduce(
        (acc, log) => {
            const date = new Date(log.createdAt).toLocaleString("en-GB", { weekday: "long", year: "numeric", month: "numeric", day: "numeric" });
            if (!acc[date]) acc[date] = [];
            acc[date].push(log);
            return acc;
        },
        {} as Record<string, typeof logsResponse>,
    );

    return (
        <div className="flex flex-col w-full">
            <Breadcrumb className="my-4 mx-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/panel">Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center">
                            <ScrollText className="h-4 min-w-4" /> Cockpit Logs
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <main className="flex flex-col gap-8 px-8">
                {Object.entries(groupedLogs).map(([date, logs]) => (
                    <div key={date} className="flex flex-col gap-1">
                        <h2 className="font-semibold text-lg">
                            {date} -{" "}
                            <span className="font-extrabold italic">
                                {logs.length} {logs.length === 1 ? "entry" : "entries"}
                            </span>
                        </h2>
                        <div className="flex flex-wrap gap-x-6">
                            {logs.map(async (log) => {
                                const profile = await getUserProfile((log.metadata as { [key: string]: string }).userId);
                                const avatarUrl = `https://cdn.discordapp.com/avatars/${profile?.id}/${profile?.avatar}`;
                                return (
                                    <a className="flex items-center" key={log.id} href={`logs/${log.id}`}>
                                        <div className="flex items-center gap-1 bg-card p-1 rounded-2xl">
                                            <img className="size-7 rounded-xl block" src={avatarUrl} alt={profile?.global_name as string} />
                                            <span className="font-bold">{profile?.global_name} </span>
                                        </div>{" "}
                                        <span>uploaded an image</span>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
