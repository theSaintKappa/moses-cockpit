"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useState } from "react";

export function ImagePreview({ url, alt, width, height }: { url: string; alt: string; width?: number; height?: number }) {
    const [loaded, setLoaded] = useState(false);

    return <Image src={url} width={width ?? 350} height={height ?? 350} alt={alt} className={cn("rounded-md bg-muted", !loaded && "animate-pulse")} onLoad={() => setLoaded(true)} />;
}
