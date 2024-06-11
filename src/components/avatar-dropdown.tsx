"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogOut, User, UserRound } from "lucide-react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { UserCheckDisplay } from "./user-check-dsiplay";

export function AvatarDropdown({ session }: { session: Session }) {
    useEffect(() => {
        console.log(session);
    }, [session]);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:rounded-full">
                <Avatar className="rounded-full p-0.5 bg-primary h-12 w-12">
                    <AvatarImage src={session.profile.image_url} className="rounded-full" />
                    <AvatarFallback>
                        <UserRound />
                    </AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel className="flex items-center gap-1 p-2">
                    <User className="h-5 min-w-5 stroke-muted-foreground" />
                    {session.profile.global_name}
                </DropdownMenuLabel>
                <DropdownMenuLabel className="block md:hidden p-2">
                    <UserCheckDisplay />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-2" onClick={() => signOut()}>
                    <span>Sign out</span>
                    <DropdownMenuShortcut>
                        <LogOut className="h-4 min-w-4" />
                    </DropdownMenuShortcut>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
