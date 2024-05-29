import { LandingGallery } from "@/components/landing-gallery";
import { Logo } from "@/components/logo";
import { SignInButton } from "@/components/sign-in-button";
import { Info } from "lucide-react";

export async function Landing() {
    return (
        <>
            <main className="h-supports-dvh w-screen flex justify-center items-center fixed z-10 p-4">
                <div className="rounded-lg border-2 border-primary shadow-card py-16 flex flex-col items-center gap-12 bg-card w-full max-w-xl">
                    <div className="flex flex-col gap-6">
                        <Logo className="h-24 md:h-36 w-auto" />
                        <p className="text-muted-foreground text-center text-sm md:text-base flex gap-1 justify-center items-center">
                            <Info className="h-5 min-w-5" />
                            You need to sign in to access the dashboard
                        </p>
                    </div>
                    <SignInButton />
                </div>
            </main>
            <LandingGallery />
        </>
    );
}
