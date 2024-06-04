import Image from "next/image";

interface ImageApiResponse {
    id: string;
    url: string;
    [key: string]: unknown;
}

export async function LandingGallery() {
    const images: ImageApiResponse[] = await fetch("https://api.saintkappa.dev/moses/pics?excludeTypes=image/gif&sample=150", { next: { revalidate: 10 } })
        .then((res) => res.json())
        .catch(() => []);

    return (
        <div className="overflow-hidden">
            <div className="h-supports-dvh w-screen overflow-hidden relative animate-gallery-fade-in">
                <div className="col-count-3 lg:col-count-4 xl:col-count-5 2xl:col-count-6 leading-[0] gap-4 md:gap-8 pointer-events-none select-none absolute w-full animate-gallery-scroll">
                    {images.map(({ id, url }) => (
                        <Image src={url} alt={id} key={id} width={30} height={30} className="w-full blur-[10px] md:blur-[14px] mb-4 md:mb-8" />
                    ))}
                </div>
            </div>
        </div>
    );
}
