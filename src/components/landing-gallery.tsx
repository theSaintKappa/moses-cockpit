import Image from "next/image";

interface ImageApiResponse {
    id: string;
    url: string;
    [key: string]: unknown;
}

export async function LandingGallery() {
    const images: ImageApiResponse[] = await fetch("https://api.saintkappa.dev/moses/pics?excludeTypes=image/gif&sample=150", { next: { revalidate: 5 } })
        .then((res) => res.json())
        .catch(() => []);

    return (
        <div className="overflow-hidden">
            <div className="h-supports-dvh w-screen overflow-hidden relative animate-gallery-fade-in">
                <div className="col-count-3 lg:col-count-4 xl:col-count-5 2xl:col-count-6 leading-[0] gap-4 md:gap-6 pointer-events-none select-none absolute w-full animate-gallery-scroll transition-all">
                    {images.map(({ id, url }) => (
                        <Image src={url} alt={id} key={id} quality={50} priority={true} width={40} height={40} className="w-full blur-[8px] md:blur-[12px] mb-4 md:mb-6 rounded-2xl" />
                    ))}
                </div>
            </div>
        </div>
    );
}
