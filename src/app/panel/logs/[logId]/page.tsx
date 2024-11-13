import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { prisma } from "@/lib/prisma";
import { ScrollText } from "lucide-react";

export default async function Page({ params }: { params: Promise<{ logId: string }> }) {
    const { logId } = await params;
    const log = await prisma.cockpitLog.findUnique({ where: { id: logId } });

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
                        {log?.action} | {logId}
                    </BreadcrumbPage>
                </BreadcrumbList>
            </Breadcrumb>
            <main>
                <pre>{JSON.stringify(log, null, 4)}</pre>
            </main>
        </div>
    );
}
