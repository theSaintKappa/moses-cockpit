"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { GitBranch, Github, LogOut, User, UserRound } from "lucide-react";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { UserCheckDisplay } from "./user-check-dsiplay";

export function AvatarDropdown({ session }: { session: Session }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="focus:rounded-full h-full">
                <div className="h-full p-1">
                    <Avatar className="p-0.5 bg-primary h-full w-auto aspect-square">
                        <AvatarImage src={session.profile.image_url} className="rounded-full" />
                        <AvatarFallback>
                            <UserRound className="h-7 min-w-7 stroke-muted-foreground" />
                        </AvatarFallback>
                    </Avatar>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mx-2 my-1">
                <DropdownMenuLabel className="p-2 flex">
                    <User className="h-5 min-w-5 mr-1 stroke-muted-foreground" />
                    <span className="text-base font-extrabold">{session.profile.global_name}</span>
                </DropdownMenuLabel>
                <DropdownMenuLabel className="block md:hidden p-2">
                    <UserCheckDisplay style="compact" />
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="cursor-pointer">
                        <Github className="h-4 min-w-4 mr-1 stroke-muted-foreground" />
                        <span>GitHub</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                        <DropdownMenuSubContent>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <a href="https://github.com/theSaintKappa/cockpit" target="_blank" rel="noreferrer">
                                    <GitBranch className="h-4 min-w-4 mr-1 stroke-muted-foreground" />
                                    <span>Cockpit (main)</span>
                                </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer" asChild>
                                <a href="https://github.com/theSaintKappa/MosesBot" target="_blank" rel="noreferrer">
                                    <GitBranch className="h-4 min-w-4 mr-1 stroke-muted-foreground" />
                                    <span>MosesBot (main)</span>
                                </a>
                            </DropdownMenuItem>
                        </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                </DropdownMenuSub>
                <DropdownMenuItem className="cursor-pointer" onClick={() => signOut()}>
                    <LogOut className="h-4 min-w-4 mr-1 stroke-muted-foreground" />
                    <span>Sign out</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
