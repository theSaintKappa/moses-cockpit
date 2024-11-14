import { getUserProfile } from "@/app/actions/user-profile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { logStrings } from "@/lib/constants";
import { prisma } from "@/lib/prisma";
import { CalendarDaysIcon, Clock4Icon, Hash, MessageCircleMore, ScrollText, Signature } from "lucide-react";
import { ImagePreview } from "./image-preview";

export default async function Page({ params }: { params: Promise<{ logId: string }> }) {
    const { logId } = await params;
    const log = await prisma.cockpitLog.findUnique({ where: { id: logId } });
    if (!log) return <div>Log not found</div>;

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const metadata = log.metadata as { [key: string]: any };
    const profile = await getUserProfile(log.invokerId);

    // Only fetch author profile if the action is "pt_quote_add" cause only that can have an author
    const authorProfile = log.action === "pt_quote_add" ? await getUserProfile(metadata.authorId) : null;

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
                <div className="flex flex-col items-start rounded-3xl border space-y-6 p-6 font-mono">
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <img className="size-8 rounded-full" src={profile?.avatar_url} alt={profile?.global_name as string} />
                            <span>
                                <span className="font-bold">{profile?.global_name}</span> {logStrings[log.action]}
                            </span>
                        </div>
                        <div className="space-y-2 px-1">
                            <span className="flex items-center gap-2">
                                <CalendarDaysIcon className="h-6 min-w-6" /> {new Date(log.createdAt).toLocaleDateString("en-GB", { weekday: "short", year: "numeric", month: "long", day: "numeric" })}
                            </span>
                            <span className="flex items-center gap-2">
                                <Clock4Icon className="h-6 min-w-6" /> {new Date(log.createdAt).toLocaleTimeString("en-GB")}
                            </span>
                            {log.action === "image_upload" && (
                                <span className="flex items-center gap-2">
                                    <Hash className="h-6 min-w-6" />{" "}
                                    <a className="text-primary hover:underline" href={metadata.url} target="_blank" rel="noreferrer">
                                        {metadata.id}
                                    </a>
                                </span>
                            )}
                            {log.action === "moses_quote_add" && (
                                <>
                                    <span className="flex items-center gap-2">
                                        <Hash className="h-6 min-w-6" /> {metadata.id}
                                    </span>
                                    <span className="flex items-center gap-2 break-all">
                                        <MessageCircleMore className="h-6 min-w-6" /> {metadata.content}
                                    </span>
                                </>
                            )}
                            {log.action === "pt_quote_add" && (
                                <>
                                    <span className="flex items-center gap-2">
                                        <Hash className="h-6 min-w-6" /> {metadata.id}
                                    </span>
                                    <span className="flex items-center gap-2 text-pretty">
                                        <MessageCircleMore className="h-6 min-w-6" /> {metadata.content}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <Signature className="h-6 min-w-6" />
                                        <img className="size-7 rounded-full" src={authorProfile?.avatar_url} alt={authorProfile?.global_name as string} />
                                        <span className="font-bold">{authorProfile?.global_name}</span>
                                    </span>
                                </>
                            )}
                            {log.action === "presence_change" && (
                                <>
                                    <span className="flex items-center gap-2">
                                        <span className="text-xs font-black">old</span> {metadata.oldPresence.type === "Custom" ? "" : `${metadata.oldPresence.type} `}
                                        {metadata.oldPresence.name} <span className="italic opacity-50">({metadata.oldPresence.status})</span>
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <span className="text-xs font-black">new</span> {metadata.newPresence.type === "Custom" ? "" : `${metadata.newPresence.type} `}
                                        {metadata.newPresence.name} <span className="italic opacity-50">({metadata.newPresence.status})</span>
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                    {log.action === "image_upload" && <ImagePreview url={metadata.url} alt={metadata.id} />}
                </div>
            </main>
        </div>
    );
}
