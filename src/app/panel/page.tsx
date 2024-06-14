import { Header } from "@/components/header";
import { PanelCard } from "@/components/panel-card";
import type { PanelCardProps } from "@/components/panel-card";
import { getServerSession } from "@/server/auth";
import { Award, FileClock, ImagePlus, Images, ListStart, Quote, Watch } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession();

    if (!session) return redirect("/");

    const panelCards: Omit<PanelCardProps, "index">[] = [
        { title: "Pics", description: "Submit new Moses Pics to the CDN", path: "/panel/pics", icon: ImagePlus },
        { title: "Quotes", description: "Display, add or manage Moses Quotes", path: "/panel/quotes", icon: Quote, disabled: true },
        { title: "QuoteQueue", description: "View and manage the Quote Queue", path: "/panel/quote-queue", icon: ListStart, disabled: true },
        { title: "Leaderboard", description: "Display the Moses Quote Leaderboard", path: "/panel/leaderboard", icon: Award, disabled: true },
        { title: "VoiceTime", description: "View the current VoiceTime statistics", path: "/panel/voice-time", icon: Watch, disabled: true },
        { title: "Gallery", description: "Cool Moses Pics Gallery :3", path: "/panel/gallery", icon: Images, disabled: true },
        { title: "Logs", description: "Inspect Moses Logs", path: "/panel/gallery", icon: FileClock, disabled: true },
    ];

    return (
        <>
            <Header session={session} />
            <main className="min-h-[calc(100dvh-8rem)] max-w-[100rem] mx-auto flex justify-center items-center p-8">
                <section className="flex flex-wrap justify-center gap-8">
                    {panelCards.map(({ title, description, path, icon, disabled }, i) => (
                        <PanelCard key={path} title={title} description={description} path={path} icon={icon} disabled={disabled ?? false} index={i} />
                    ))}
                </section>
            </main>
        </>
    );
}
