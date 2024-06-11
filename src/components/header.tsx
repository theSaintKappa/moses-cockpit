import type { Session } from "next-auth";
import { AvatarDropdown } from "./avatar-dropdown";
import { Logo } from "./logo";
import { UserCheckDisplay } from "./user-check-dsiplay";

export function Header({ session }: { session: Session }) {
    return (
        <header className="fixed w-screen p-8">
            <div className="max-w-7xl mx-auto flex justify-between">
                <Logo className="h-16 w-auto" />
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <UserCheckDisplay size={5} />
                    </div>
                    <AvatarDropdown session={session} />
                </div>
            </div>
        </header>
    );
}
