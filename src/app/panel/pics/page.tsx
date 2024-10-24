import { PicUpload } from "@/components/pic-upload";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { ImagePlus } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Upload Pics",
};

export default function Page() {
    return (
        <div className="grow flex flex-col">
            <Breadcrumb className="my-4 mx-6">
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/panel">Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center">
                            <ImagePlus className="h-4 min-w-4" /> Moses Pics
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <main className="grow flex flex-col justify-between items-center">
                <PicUpload />
            </main>
        </div>
    );
}
