import { cn } from "@/lib/utils";
import type { LucideProps } from "lucide-react";
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
}

export function PanelCard({ title, description, path, icon, disabled, index }: PanelCardProps) {
    const Icon = icon;

    return (
        <div className={cn("relative rounded-2xl overflow-hidden flex animate-panel-card -translate-y-[50%] opacity-0 scale-[1.05] w-full md:w-80", disabled && "cursor-not-allowed")} style={{ animationDelay: `${index * 100}ms` }}>
            <Link href={path} className={cn("border border-primary border-opacity-85 hover:border-opacity-100 transition-all rounded-2xl flex flex-col gap-4 p-8 w-full group relative overflow-hidden", disabled && "pointer-events-none opacity-60")}>
                <Icon className="size-9 md:size-12 transition-opacity opacity-85 group-hover:opacity-100" />
                <div className="flex flex-col items-start gap-1">
                    <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
                    <span className="text-muted-foreground text-sm md:text-base text-start text-balance">{description}</span>
                </div>
                <div className="absolute inset-0 card-bg-pattern opacity-35 hover:opacity-50 hover:translate-y-2 duration-300" />
            </Link>
            {disabled && <Image src="/coming-soon.svg" alt="Coming Soon" width={748} height={508} className="absolute inset-0 size-full place-self-center" />}
            {disabled && <span className="absolute inset-0 flex items-center justify-center text-4xl font-black text-primary-foreground drop-shadow-[2px_2px_3px_rgb(0,0,0)]">Coming Soon&trade;</span>}
        </div>
    );
}
