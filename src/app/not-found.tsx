import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next/types";

export const metadata: Metadata = {
    title: "You're lost...",
    description: "404 Not Found",
};

export default async function NotFoundPage() {
    const image = (await fetch("https://api.saintkappa.dev/moses/pics/random", { cache: "no-cache" }).then((res) => res.json())) as { url: string; [key: string]: unknown };

    return (
        <>
            <Logo className="absolute z-10 bottom-0 right-0 m-8 h-14 md:h-20 w-auto" />
            <main className="flex flex-col items-center justify-center gap-8 h-supports-dvh w-screen p-4">
                <Image src={image.url} alt="404 Not Found" layout="fill" className="absolute size-full brightness-[0.2] pointer-events-none" />
                <div className="z-10 text-center flex flex-col gap-6 drop-shadow-[2px_2px_3px_rgb(0,0,0)]">
                    <span className="text-6xl md:text-8xl italic text-primary font-black">Uh oh...</span>
                    <h1 className="text-2xl md:text-4xl font-semibold text-primary-foreground text-balance">It looks like the page you're looking for doesn't exist</h1>
                </div>
                <Button variant="link" className="z-10 text-xl" asChild>
                    <Link href="/">
                        <ArrowLeft className="mr-2" /> Go back
                    </Link>
                </Button>
            </main>
        </>
    );
}
