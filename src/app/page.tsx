import { LandingGallery } from "@/components/landing-gallery";
import { Logo } from "@/components/logo";
import { SignInButton } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { getServerSession } from "@/server/auth";
import { Github, Info, SquareArrowOutUpRight } from "lucide-react";
import { redirect } from "next/navigation";

export default async function Page() {
    const session = await getServerSession();

    if (session) return redirect("/panel");

    return (
        <>
            <main className="h-supports-dvh w-screen flex justify-center items-center fixed z-10 p-4">
                <div className="rounded-lg border-2 border-primary shadow-card py-16 flex flex-col items-center gap-8 backdrop-blur-xl backdrop-brightness-[0.2] w-full max-w-lg md:max-w-xl animate-login-modal">
                    <Logo className="h-24 md:h-36 w-auto" />
                    <p className="text-muted-foreground text-center text-[0.8rem] md:text-base flex gap-0.5 justify-center items-center">
                        <Info className="h-4 min-w-4 md:h-5 md:min-w-5" />
                        You need to sign in to access the panel
                    </p>
                    <SignInButton />
                </div>
            </main>

            <LandingGallery />

            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" className="text-primary-foreground absolute top-0 right-0 m-2 p-2 z-10" asChild>
                            <a href="https://github.com/theSaintKappa/cockpit" target="_blank" rel="noreferrer">
                                <Github />
                            </a>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                        <p className="flex items-center gap-0.5">
                            Go to repo <SquareArrowOutUpRight className="h-4 min-w-4" />
                        </p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        </>
    );
}
