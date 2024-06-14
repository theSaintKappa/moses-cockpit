"use client";

import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CheckIcon, CircleAlert, Component, Loader2, Shield, Tag, XIcon } from "lucide-react";
import { useUserCheck } from "./user-check-provider";

export function UserCheckDisplay({ style = "loose" }: { style?: "loose" | "compact" }) {
    const userCheck = useUserCheck();

    const sizeClass = style === "loose" ? "h-5 w-5" : "h-4 w-4";
    const paddingClass = style === "loose" ? "py-2.5 px-3.5" : "py-1.5 px-2.5";

    // Note to future self: You can't construct class names dynamically in Tailwind
    const textColors = { true: "text-green-500", false: "text-red-500", error: "text-yellow-400" };
    const borderColors = { true: "border-green-500", false: "border-red-500", error: "border-yellow-400" };

    const Loading = () => <Loader2 className={cn("animate-spin stroke-muted-foreground", sizeClass)} />;
    const Check = () => <CheckIcon className={cn("animate-fade-in", textColors.true, sizeClass)} />;
    const X = () => <XIcon className={cn("animate-fade-in", textColors.false, sizeClass)} />;

    function UserCheckIcon({ isTrue }: { isTrue: boolean }) {
        if (userCheck.isLoading) return <Loading />;
        if (userCheck.error) return <CircleAlert className={cn(textColors.error, sizeClass)} />;
        if (isTrue) return <Check />;
        return <X />;
    }

    return (
        <div className={cn("flex", style === "loose" ? "gap-2" : "gap-1")}>
            <Popover>
                <PopoverTrigger className="focus:rounded-full">
                    <Badge className={cn("gap-1 md:gap-2 bg-background border-border", paddingClass)} variant="secondary">
                        <Component className={sizeClass} />
                        <UserCheckIcon isTrue={userCheck.isMember} />
                    </Badge>
                </PopoverTrigger>
                {!userCheck.isLoading && (
                    <PopoverContent className={cn("w-fit", userCheck.error ? borderColors.error : userCheck.isMember ? borderColors.true : borderColors.false)}>
                        <p className="text-sm">{userCheck.error ? "An error occurred while checking your membership" : userCheck.isMember ? "You're a Moses member" : "You're not a Moses member"}</p>
                    </PopoverContent>
                )}
            </Popover>
            <Popover>
                <PopoverTrigger className="focus:rounded-full">
                    <Badge className={cn("gap-1 md:gap-2 bg-background border-border", paddingClass)} variant="secondary">
                        <Tag className={sizeClass} />
                        <UserCheckIcon isTrue={userCheck.isClassmate} />
                    </Badge>
                </PopoverTrigger>
                {!userCheck.isLoading && (
                    <PopoverContent className={cn("w-fit", userCheck.error ? borderColors.error : userCheck.isClassmate ? borderColors.true : borderColors.false)}>
                        <p className="text-sm">{userCheck.error ? "An error occurred while checking your roles" : userCheck.isClassmate ? "You have the 3pT role" : "You do not have the 3pT role"}</p>
                    </PopoverContent>
                )}
            </Popover>
            <Popover>
                <PopoverTrigger className="focus:rounded-full">
                    <Badge className={cn("gap-1 md:gap-2 bg-background border-border", paddingClass)} variant="secondary">
                        <Shield className={sizeClass} />
                        <UserCheckIcon isTrue={userCheck.isCockpitAdmin} />
                    </Badge>
                </PopoverTrigger>
                {!userCheck.isLoading && (
                    <PopoverContent className={cn("w-fit", userCheck.error ? borderColors.error : userCheck.isCockpitAdmin ? borderColors.true : borderColors.false)}>
                        <p className="text-sm">{userCheck.error ? "An error occurred while checking your roles" : userCheck.isCockpitAdmin ? "You're a Cockpit Admin" : "You're not a Cockpit Admin"}</p>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    );
}
