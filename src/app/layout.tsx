import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/session-provider";
import { UserCheckProvider } from "@/components/user-check-provider";
import { cn } from "@/lib/utils";
import { getServerSession } from "@/server/auth";

export const metadata: Metadata = {
    title: {
        template: "%s | Moses Cockpit",
        default: "Moses Cockpit",
    },
    description: "App for interacting with MosesBot on the web!",
    authors: { name: "SaintKappa", url: "https://saintkappa.dev" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession();

    return (
        <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
            <body suppressHydrationWarning>
                <SessionProvider session={session}>
                    <UserCheckProvider session={session}>{children}</UserCheckProvider>
                </SessionProvider>
            </body>
        </html>
    );
}
