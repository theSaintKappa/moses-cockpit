"use client";

import userCheck from "@/app/actions/user-check";
import { Button } from "@/components/ui/button";
import type { RESTError } from "discord-api-types/v10";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect, useState } from "react";

interface UserCheckResponse {
    error: RESTError | null;
    isMember: boolean;
    hasRole: boolean;
}

export function Dashboard({ session }: { session: Session }) {
    const [userCheckResponse, setUserCheckResponse] = useState<UserCheckResponse>({ error: null, isMember: false, hasRole: false });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        userCheck(session.account.access_token).then((response) => {
            setUserCheckResponse(response);
            setLoading(false);
        });
    }, [session.account.access_token]);

    return (
        <main className="h-supports-dvh flex flex-col justify-center items-center gap-4">
            <img src={session.profile.image_url} alt={session.profile.global_name} className="rounded-full h-24 w-24" />
            <h1 className="text-4xl">Welcome, {session.profile.global_name}</h1>
            {!loading && JSON.stringify(userCheckResponse)}
            <Button variant="outline" onClick={() => signOut()}>
                Sign out
            </Button>
        </main>
    );
}
