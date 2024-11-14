import getUserProfile from "@/app/actions/user-profile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { logStrings } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { CalendarDaysIcon, Clock4Icon, Hash, ScrollText } from "lucide-react";
import Image from "next/image";

export default async function Page({ params }: { params: Promise<{ logId: string }> }) {
    const { logId } = await params;
    const log = await prisma.cockpitLog.findUnique({ where: { id: logId } });
    if (!log) return <div>Log not found</div>;

    const metadata = log.metadata as { [key: string]: string };
    const profile = await getUserProfile((log.metadata as { [key: string]: string }).userId);
    const avatarUrl = `https://cdn.discordapp.com/avatars/${profile?.id}/${profile?.avatar}`;

    return (
        <div className="flex flex-col w-full">
            <Breadcrumb className="my-4 mx-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/panel">Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink className="flex items-center" href="/panel/logs">
                            <ScrollText className="h-4 min-w-4" /> Cockpit Logs
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbPage>
                        {profile?.username}'s {log.action}
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <main className="grow flex flex-col justify-center items-center p-4">
                <div className="flex flex-col items-center rounded-3xl border space-y-6 p-6 font-mono">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img className="size-8 rounded-full" src={avatarUrl} alt={profile?.global_name as string} />
                            <span>
                                <span className="font-bold">{profile?.global_name}</span> {logStrings[log.action]}
                            </span>
                        </div>
                        <div className="space-y-2 px-1">
                            <span className="flex items-center gap-2">
                                <CalendarDaysIcon className="h-6 w-6" /> {new Date(log.createdAt).toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month: "long", day: "numeric" })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock4Icon className="h-6 w-6" /> {new Date(log.createdAt).toLocaleTimeString("en-GB")}
                            </span>
                            <span className="flex items-center gap-2">
                                <Hash className="h-6 w-6" />{" "}
                                <a className="text-primary hover:underline" href={metadata.url} target="_blank" rel="noreferrer">
                                    {metadata.id}
                                </a>
                            </span>
                        </div>
                    </div>
                    <Image src={metadata.url} alt={metadata.id} width={350} height={350} className="rounded-md" />
                </div>
            </main>
        </div>
    );
}
