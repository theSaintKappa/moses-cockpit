"use client";

import { Button } from "@/components/ui/button";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

export function Dashboard({ session }: { session: Session }) {
    console.log(session);

    return (
        <main className="h-supports-dvh flex flex-col justify-center items-center gap-4">
            <h1 className="text-4xl">Welcome, {session.profile.global_name}</h1>
            <Button variant="outline" onClick={() => signOut()}>
                Sign out
            </Button>
        </main>
    );
}
