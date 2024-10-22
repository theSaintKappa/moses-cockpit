import { getLogs } from "@/app/actions/logs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ScrollText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Logs",
};

export default async function Page() {
    const logsResponse = await getLogs();
    if (!("logs" in logsResponse)) return null;

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
            <main className="flex flex-col px-6">
                {logsResponse.logs.map((log) => (
                    <div key={log._id} className="border rounded-lg p-4 mt-4">
                        <pre className="text-wrap text-sm">{JSON.stringify(log, null, 4)}</pre>
                    </div>
                ))}
            </main>
        </div>
    );
}
