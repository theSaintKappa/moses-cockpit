import { LandingGallery } from "@/components/landing-gallery";
import { Logo } from "@/components/logo";
import { SignInButton } from "@/components/sign-in-button";
import { Button } from "@/components/ui/button";
import { Github, Info, SquareArrowOutUpRight } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

export async function Landing() {
    return (
        <>
            <main className="h-supports-dvh w-screen flex justify-center items-center fixed z-10 p-8">
                <div className="rounded-lg border-2 border-primary shadow-card py-16 flex flex-col items-center gap-8 bg-card w-full max-w-lg md:max-w-xl">
                    <Logo className="h-28 md:h-32 w-auto" />
                    <p className="text-muted-foreground text-center text-[0.825rem] md:text-base flex gap-1 justify-center items-center">
                        <Info className="h-4 min-w-4 md:h-5 md:min-w-5" />
                        You need to sign in to access the dashboard
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
