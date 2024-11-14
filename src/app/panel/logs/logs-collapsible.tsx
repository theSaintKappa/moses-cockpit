import { getUserProfile } from "@/app/actions/user-profile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Separator } from "@/components/ui/separator";
import type { CockpitLog } from "@prisma/client";
import { ArrowRight, ChevronsUpDown, SquareArrowOutUpRight } from "lucide-react";
import Link from "next/link";

export function LogsCollapsible({ date, logs }: { date: string; logs: CockpitLog[] }) {
    return (
        <Collapsible className="space-y-2 w-full" defaultOpen={true}>
            <CollapsibleTrigger asChild className="flex items-center space-x-2 p-3 rounded-md cursor-pointer hover:bg-card">
                <div>
                    <h2 className="font-medium text-md whitespace-nowrap">
                        {date} -{" "}
                        <span className="font-bold">
                            {logs.length} {logs.length === 1 ? "entry" : "entries"}
                        </span>
                    </h2>
                    <div>
                        <ChevronsUpDown className="h-4 w-4" />
                    </div>
                    <Separator className="shrink" />
                </div>
            </CollapsibleTrigger>
            <CollapsibleContent className="flex flex-wrap gap-2">
                {logs.map(async (log) => {
                    const profile = await getUserProfile(log.invokerId);
                    return (
                        <Link className="flex items-center rounded-md border p-2 space-x-2 font-mono text-sm hover:bg-card" key={log.id} href={`logs/${log.id}`}>
                            <img className="size-7 rounded-full" src={profile?.avatar_url} alt={profile?.global_name as string} />
                            <span className="space-x-1">
                                <span className="font-bold">{profile?.global_name}</span>
                                <ArrowRight className="size-4 inline" />
                                <span>{log.action}</span>
                            </span>
                            <SquareArrowOutUpRight className="size-4" />
                        </Link>
                    );
                })}
            </CollapsibleContent>
        </Collapsible>
    );
}
