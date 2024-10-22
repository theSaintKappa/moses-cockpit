"use client";

import { useUserCheck } from "@/components/user-check-provider";
import { cn } from "@/lib/utils";
import { Award, FileClock, ImagePlus, Images, ListStart, type LucideProps, Quote, Watch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

export interface PanelCardProps {
    title: string;
    description: string;
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
    path: string;
    disabled?: boolean;
    index: number;
    permission: "class" | "admin";
}

export function PanelCards() {
    const panelCards: Omit<PanelCardProps, "index">[] = [
        { title: "Pics", description: "Upload & submit new Moses Pics", path: "/panel/pics", icon: ImagePlus, permission: "class" },
        { title: "Logs", description: "Inspect Moses Logs", path: "/panel/logs", icon: FileClock, permission: "admin" },
        { title: "Quotes", description: "Display & manage Moses Quotes", path: "/panel/quotes", icon: Quote, permission: "admin", disabled: true },
        { title: "QuoteQueue", description: "View & manage the Quote Queue", path: "/panel/quote-queue", icon: ListStart, permission: "admin", disabled: true },
        { title: "Leaderboard", description: "Display the Quote Leaderboard", path: "/panel/leaderboard", icon: Award, permission: "admin", disabled: true },
        { title: "VoiceTime", description: "Display VoiceTime statistics", path: "/panel/voice-time", icon: Watch, permission: "admin", disabled: true },
        { title: "Gallery", description: "Cool Moses Pics Gallery :3", path: "/panel/gallery", icon: Images, permission: "admin", disabled: true },
    ];

    return panelCards.map(({ title, description, path, icon, permission, disabled }, i) => <PanelCard key={path} title={title} description={description} path={path} icon={icon} permission={permission} disabled={disabled ?? false} index={i} />);
}

function PanelCard({ title, description, path, icon, permission, disabled, index }: PanelCardProps) {
    const Icon = icon;
    const userCheck = useUserCheck();
    const hasPermission = userCheck.isLoading || (permission === "class" && userCheck.isClassmate) || (permission === "admin" && userCheck.isCockpitAdmin);

    return (
        <div className={cn("relative rounded-2xl overflow-hidden flex animate-panel-card -translate-y-[50%] opacity-0 scale-[1.05] w-full md:w-80", (disabled || !hasPermission) && "cursor-not-allowed")} style={{ animationDelay: `${index * 100}ms` }}>
            <Link href={path} className={cn("border border-primary border-opacity-85 hover:border-opacity-100 transition-all rounded-2xl flex flex-col gap-4 p-8 w-full group relative overflow-hidden", (disabled || !hasPermission) && "pointer-events-none opacity-60")}>
                <Icon className="size-9 md:size-12 transition-opacity opacity-85 group-hover:opacity-100" />
                <div className="flex flex-col items-start gap-1">
                    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                    <span className="text-muted-foreground text-sm md:text-base text-start text-balance">{description}</span>
                </div>
                <div className="absolute inset-0 card-bg-pattern opacity-35 hover:opacity-50 hover:translate-y-2 duration-300" />
            </Link>
            {disabled && <Image src="/coming-soon.svg" alt="Coming Soon" width={748} height={508} className="absolute inset-0 size-full place-self-center" />}
            {disabled && <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary-foreground drop-shadow-[2px_2px_3px_rgb(0,0,0)]">Coming Soon&trade;</span>}
            {!disabled && !hasPermission && <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-primary-foreground drop-shadow-[2px_2px_3px_rgb(0,0,0)]">No Permission</span>}
        </div>
    );
}
