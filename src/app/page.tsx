import { Dashboard } from "@/components/dashboard";
import { Landing } from "@/components/landing";
import { getServerSession } from "@/server/auth";

export default async function Home() {
    const session = await getServerSession();

    return !session ? <Landing /> : <Dashboard session={session} />;
}
