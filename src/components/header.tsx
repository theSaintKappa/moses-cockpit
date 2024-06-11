import type { Session } from "next-auth";
import { AvatarDropdown } from "./avatar-dropdown";
import { Logo } from "./logo";
import { Separator } from "./ui/separator";
import { UserCheckDisplay } from "./user-check-dsiplay";

export function Header({ session }: { session: Session }) {
    return (
        <header className="sticky top-0 h-28 bg-background">
            <div className="h-full max-w-[100rem] mx-auto flex justify-between p-6">
                <div>
                    <Logo className="h-[112.5%] w-auto" />
                </div>
                <div className="flex items-center h-full gap-4">
                    <div className="hidden md:block">
                        <UserCheckDisplay style="loose" />
                    </div>
                    <AvatarDropdown session={session} />
                </div>
            </div>
            <Separator />
        </header>
    );
}
