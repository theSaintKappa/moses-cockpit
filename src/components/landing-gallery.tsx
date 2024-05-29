import Image from "next/image";

interface ImageApiResponse {
    id: string;
    url: string;
    [key: string]: unknown;
}

export async function LandingGallery() {
    const images: ImageApiResponse[] = await fetch("https://api.saintkappa.dev/moses/pics?excludeTypes=image/gif&sample=100", { next: { revalidate: 5 } })
        .then((res) => res.json())
        .catch(() => []);

    return (
        <div className="h-supports-dvh w-screen overflow-hidden relative">
            <div className="col-count-3 md:col-count-4 lg:col-count-5 leading-[0] gap-4 pointer-events-none select-none absolute w-full animate-gallery-scroll">
                {images.map(({ id, url }) => (
                    <Image src={url} alt={id} key={id} width={35} height={35} className="w-full blur-lg mb-4" />
                ))}
            </div>
        </div>
    );
}
