"use client";

import { PanelCard } from "@/components/panel-card";
import type { PanelCardProps } from "@/components/panel-card";
import { Award, FileClock, ImagePlus, Images, ListStart, Quote, Watch } from "lucide-react";

export default function Page() {
    const panelCards: Omit<PanelCardProps, "index">[] = [
        { title: "Pics", description: "Upload & submit new Moses Pics", path: "/panel/pics", icon: ImagePlus, permission: "class" },
        { title: "Quotes", description: "Display & manage Moses Quotes", path: "/panel/quotes", icon: Quote, permission: "admin", disabled: true },
        { title: "QuoteQueue", description: "View & manage the Quote Queue", path: "/panel/quote-queue", icon: ListStart, permission: "admin", disabled: true },
        { title: "Leaderboard", description: "Display the Quote Leaderboard", path: "/panel/leaderboard", icon: Award, permission: "admin", disabled: true },
        { title: "VoiceTime", description: "Display VoiceTime statistics", path: "/panel/voice-time", icon: Watch, permission: "admin", disabled: true },
        { title: "Gallery", description: "Cool Moses Pics Gallery :3", path: "/panel/gallery", icon: Images, permission: "admin", disabled: true },
        { title: "Logs", description: "Inspect Moses Logs", path: "/panel/logs", icon: FileClock, permission: "admin", disabled: true },
    ];

    return (
        <main className="flex flex-wrap justify-center content-center gap-8 md:gap-12 p-6">
            {panelCards.map(({ title, description, path, icon, permission, disabled }, i) => (
                <PanelCard key={path} title={title} description={description} path={path} icon={icon} permission={permission} disabled={disabled ?? false} index={i} />
            ))}
        </main>
    );
}
