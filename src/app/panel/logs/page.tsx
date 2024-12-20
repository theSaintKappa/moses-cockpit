import { LogsCollapsible } from "@/app/panel/logs/logs-collapsible";
import { LogsFilters } from "@/app/panel/logs/logs-filters";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import { LogAction } from "@prisma/client";
import { ScrollText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Logs" };

export default async function Page({ searchParams }: { searchParams?: { [key: string]: string | undefined } }) {
    const logsResponse = await prisma.cockpitLog.findMany({
        where: { action: Object.values(LogAction).includes(searchParams?.action as LogAction) ? (searchParams?.action as LogAction) : undefined, invokerId: searchParams?.invokerId ?? undefined },
        orderBy: { createdAt: "desc" },
    });

    const groupedLogs = logsResponse.reduce(
        (acc, log) => {
            const date = new Date(log.createdAt).toLocaleString("en-GB", { weekday: "short", year: "numeric", month: "numeric", day: "numeric" });
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
            <main className="flex flex-col items-start gap-6 px-8 py-2">
                <LogsFilters />
                {logsResponse.length === 0 ? <p className="text-center">No logs found.</p> : Object.entries(groupedLogs).map(([date, logs]) => <LogsCollapsible key={date} date={date} logs={logs} />)}
            </main>
        </div>
    );
}
