import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import "./globals.css";
import { SessionProvider } from "@/components/session-provider";
import { cn } from "@/lib/utils";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Moses Cockpit",
    description: "App for interacting with MosesBot on the web!",
    authors: { name: "SaintKappa", url: "https://saintkappa.dev" },
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession();

    return (
        <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)}>
            <body suppressHydrationWarning>
                <SessionProvider session={session}>{children}</SessionProvider>
            </body>
        </html>
    );
}
