"use client";

import { getUserProfileCache } from "@/app/actions/user-profile";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import type { APIUserProfile } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LogAction } from "@prisma/client";
import { Check, ChevronsUpDown, Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LogsFilters() {
    const router = useRouter();
    const [actionOpen, setActionOpen] = useState(false);
    const [actionValue, setActionValue] = useState("");
    const [userOpen, setUserOpen] = useState(false);
    const [userValue, setUserValue] = useState("");

    const [actions, setActions] = useState<string[]>([]);
    const [users, setUsers] = useState<APIUserProfile[]>([]);

    useEffect(() => {
        setActions(Object.values(LogAction));
        const getUsers = async () => {
            const users = await getUserProfileCache();
            setUsers(Array.from(users.values()));
        };
        getUsers();
    }, []);

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const params = new URLSearchParams();
        if (actionValue) params.set("action", actionValue);
        if (userValue) params.set("invokerId", userValue);
        router.push(`?${params.toString()}`);
    }, [actionValue, userValue]);

    const resetFilters = () => {
        setActionValue("");
        setUserValue("");
    };

    return (
        <section className="flex flex-col gap-2">
            <span className="flex items-center gap-1 opacity-50 text-sm">
                <Filter className="size-4" /> Filter
            </span>
            <div className="flex sm:flex-row flex-col items-start gap-2">
                <Popover open={actionOpen} onOpenChange={setActionOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={actionOpen} className="w-[200px] justify-between">
                            {actionValue ? actions.find((action) => action === actionValue) : "Select action..."}
                            <ChevronsUpDown className="size-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                        <Command>
                            <CommandInput placeholder="Search action..." />
                            <CommandList>
                                <CommandEmpty>Action not found.</CommandEmpty>
                                <CommandGroup>
                                    {actions.map((action) => (
                                        <CommandItem
                                            key={action}
                                            value={action}
                                            onSelect={(currentValue) => {
                                                setActionValue(currentValue === actionValue ? "" : currentValue);
                                                setActionOpen(false);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            {action}
                                            <Check className={cn("ml-auto", actionValue === action ? "opacity-100" : "opacity-0")} />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Popover open={userOpen} onOpenChange={setUserOpen}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" role="combobox" aria-expanded={userOpen} className="w-[200px] justify-between">
                            {userValue ? users.find((user) => user.id === userValue)?.global_name : "Select user..."}
                            <ChevronsUpDown className="size-4 opacity-50" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                        <Command>
                            <CommandInput placeholder="Search user..." />
                            <CommandList>
                                <CommandEmpty>User not found.</CommandEmpty>
                                <CommandGroup>
                                    {users.map((user) => (
                                        <CommandItem
                                            key={user.id}
                                            value={`${user.global_name} ${user.username}`}
                                            onSelect={() => {
                                                setUserValue(user.id);
                                                setUserOpen(false);
                                            }}
                                            className="cursor-pointer"
                                        >
                                            <img className="size-6 rounded-full" src={user.avatar_url} alt={user.global_name as string} />
                                            <span className="font-mono text-sm">
                                                {user.global_name} <span className="opacity-50">({user.username})</span>
                                            </span>
                                            <Check className={cn("ml-auto", userValue === user.id ? "opacity-100" : "opacity-0")} />
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                    </PopoverContent>
                </Popover>
                <Button onClick={resetFilters}>Reset</Button>
            </div>
        </section>
    );
}
