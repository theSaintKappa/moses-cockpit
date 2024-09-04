import { Header } from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { getServerSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getServerSession();

    if (!session) return redirect("/");

    return (
        <>
            <Toaster richColors />
            <Header session={session} />
            <div className="min-h-[calc(100dvh-6rem)] md:min-h-[calc(100dvh-7rem)] max-w-[100rem] mx-auto flex relative">{children}</div>
        </>
    );
}
