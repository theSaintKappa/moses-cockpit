import type { ImageApiResponse } from "@/lib/types";
import Image from "next/image";

export async function LandingGallery() {
    const images: ImageApiResponse[] = await fetch("https://api.saintkappa.dev/moses/pics?excludeTypes=image/gif&sample=150", { next: { revalidate: 60 } })
        .then((res) => res.json())
        .catch(() => []);

    images.sort(() => Math.random() - 0.5);

    if (!images.length) return null;

    return (
        <div className="overflow-hidden">
            <div className="h-supports-dvh w-screen relative animate-gallery-fade-in">
                <div className="col-count-3 lg:col-count-4 xl:col-count-5 2xl:col-count-6 leading-[0] gap-0 pointer-events-none select-none absolute w-full transition-all animate-gallery-scroll blur-[6px] md:blur-[10px]">
                    {images.map(({ id, url }) => (
                        <Image src={url} alt={id} key={id} quality={40} priority={true} width={20} height={20} className="w-full p-1 sm:p-2 md:p-3 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
