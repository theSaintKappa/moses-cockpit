"use client";

import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CheckIcon, Component, Loader2, Tag, XIcon } from "lucide-react";
import { useUserCheck } from "./user-check-provider";

export function UserCheckDisplay({ size = 4 }: { size?: number }) {
    const userCheck = useUserCheck();

    const sizeClass = `h-${size} min-w-${size}`;
    const paddingClass = `p-${size - 3}`;

    const Loading = () => <Loader2 className={cn("animate-spin stroke-muted-foreground", sizeClass)} />;
    const Check = () => <CheckIcon className={cn("animate-fade-in stroke-green-500", sizeClass)} />;
    const X = () => <XIcon className={cn("animate-fade-in stroke-red-500", sizeClass)} />;

    return (
        <div className="flex gap-2 items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="focus:rounded-full">
                        <Badge className={cn("gap-0.5", paddingClass)} variant="secondary">
                            <Component className={sizeClass} />
                            {userCheck.isLoading ? <Loading /> : userCheck.isMember ? <Check /> : <X />}
                        </Badge>
                    </TooltipTrigger>
                    {!userCheck.isLoading && (
                        <TooltipContent>
                            <p>{userCheck.isMember ? "You are a member of the Moses Discord server." : "You are not a member of the Moses Discord server."}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger className="focus:rounded-full">
                        <Badge className={cn("gap-0.5", paddingClass)} variant="secondary">
                            <Tag className={sizeClass} />
                            {userCheck.isLoading ? <Loading /> : userCheck.hasRole ? <Check /> : <X />}
                        </Badge>
                    </TooltipTrigger>
                    {!userCheck.isLoading && (
                        <TooltipContent>
                            <p>{userCheck.hasRole ? "You have the 3pT role." : "You do not have the 3pT role."}</p>
                        </TooltipContent>
                    )}
                </Tooltip>
            </TooltipProvider>
        </div>
    );
}
