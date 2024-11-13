import { PanelCards } from "@/components/panel-cards";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Panel",
};

export default function Page() {
    return (
        <main className="flex flex-wrap justify-center content-center max-w-7xl mx-auto gap-6 p-6">
            <PanelCards />
        </main>
    );
}
