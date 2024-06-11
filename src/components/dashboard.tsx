"use client";

import { Header } from "@/components/header";
import type { Session } from "next-auth";

export function Dashboard({ session }: { session: Session }) {
    return (
        <>
            <Header session={session} />
            <main className="h-supports-dvh flex flex-col justify-center items-center gap-4">hi</main>
        </>
    );
}
