"use client";

import userCheck from "@/app/actions/user-check";
import type { RESTError } from "discord-api-types/v10";
import type { Session } from "next-auth";
import { type PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

interface UserCheck {
    isLoading: boolean;
    isMember: boolean;
    isClassmate: boolean;
    isCockpitAdmin: boolean;
    error: RESTError | null;
}

const initialState: UserCheck = {
    isLoading: true,
    isMember: false,
    isClassmate: false,
    isCockpitAdmin: false,
    error: null,
};

const UserCheckProviderContext = createContext<UserCheck>(initialState);

export function UserCheckProvider({ children, session }: PropsWithChildren<{ session: Session | null }>) {
    const [state, setState] = useState<UserCheck>(initialState);

    useEffect(() => {
        if (session?.account.access_token)
            userCheck(session.account.access_token).then((response) => {
                setState({ ...response, isLoading: false });
            });

        return () => {
            setState(initialState);
        };
    }, [session?.account.access_token]);

    return <UserCheckProviderContext.Provider value={state}>{children}</UserCheckProviderContext.Provider>;
}

export const useUserCheck = () => {
    const context = useContext(UserCheckProviderContext);

    if (context === undefined) throw new Error("useUserCheck must be used within a UserCheckProvider");

    return context;
};
