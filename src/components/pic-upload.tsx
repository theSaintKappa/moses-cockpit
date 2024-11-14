"use client";

import { generateSignedURL, verifyToken } from "@/app/actions/image-upload";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ChevronsDown, ImageUp, Loader2, SquareArrowOutUpRight, Trash2, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "sonner";

type Image = File & { preview: string; id?: string; url?: string };

export function PicUpload() {
    const [images, setImages] = useState<Image[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [uploadStatus, setUploadStatus] = useState<"ready" | "uploading" | "done">("ready");
    const [isAtBottom, setIsAtBottom] = useState<boolean>(true);

    async function uploadImages() {
        setUploadStatus("uploading");
        const startTime = performance.now();
        const totalSteps = images.length * 3;

        for (const [i, image] of images.entries()) {
            const imageObject = new Image();
            imageObject.src = image.preview;
            const { url, message, id, cdnUrl, token } = await generateSignedURL(image.type, image.size, { width: imageObject.width, height: imageObject.height });
            if (!url) {
                console.error(message);
                toast.error("Failed to generate signed URL");
                return;
            }

            setUploadProgress(((i * 3 + 1) / totalSteps) * 100);

            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": image.type, "X-Upload-Content-Length": image.size.toString(), "X-Goog-Content-Length-Range": `0,${image.size}` },
                body: image,
            });

            if (!res.ok) {
                const message = await res.text();
                console.error(message);
                toast.error("Failed to upload image");
                return;
            }

            setUploadProgress(((i * 3 + 2) / totalSteps) * 100);

            const tokenVerified = await verifyToken(id, token);
            if (!tokenVerified) {
                toast.error("Failed to create image reference");
                return;
            }

            setUploadProgress(((i * 3 + 3) / totalSteps) * 100);

            images[i].id = id;
            images[i].url = cdnUrl;
        }

        const endTime = performance.now();
        const uploadTime = ((endTime - startTime) / 1000).toFixed(2);

        setUploadStatus("done");
        toast.success("Success!", { description: `${images.length} image${images.length > 1 ? "s" : ""} took ${uploadTime}s` });
    }

    const onDrop = useCallback((files: File[]) => {
        if (files.reduce((acc, file) => acc + file.size, 0) > MAX_FILE_SIZE) {
            toast.error("Total upload size exceeds 100MB");
            return;
        }

        if (files.some((file) => !ALLOWED_FILE_TYPES.includes(file.type))) {
            toast.error("Invalid file type");
            return;
        }

        setImages(files.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
    }, []);

    function cancelUpload() {
        setImages([]);
        setUploadProgress(0);
        setUploadStatus("ready");
    }

    function bytesToSize(bytes: number) {
        const sizes = ["Bytes", "KB", "MB"];
        if (bytes === 0) return "0 Byte";
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${Math.round(bytes / 1024 ** i)} ${sizes[i]}`;
    }

    function handleScroll() {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const isBottom = scrollTop + windowHeight >= documentHeight - 10;
        setIsAtBottom(isBottom);
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        handleScroll();

        return () => {
            for (const image of images) URL.revokeObjectURL(image.preview);
        };
    }, [images, handleScroll]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    return !images.length ? (
        <div className="flex h-full w-full justify-center items-center p-4">
            <div {...getRootProps()} className={cn("w-full max-w-lg flex flex-col items-center justify-center gap-6 py-16 sm:py-24 rounded-lg border border-dashed cursor-pointer hover:border-primary hover:border-2 transition-colors shadow-card", isDragActive && "border-primary border-2")}>
                <input {...getInputProps()} accept={ALLOWED_FILE_TYPES.join(",")} />
                <Upload className={cn("size-12 md:size-14 stroke-muted-foreground", isDragActive && "stroke-primary")} />
                <div className="flex flex-col items-center text-muted-foreground sm:text-xl text-center">
                    <p>Drag and drop images or click to select</p>
                    <p>
                        <span className="font-semibold">PNG</span>, <span className="font-semibold">JPG</span>, <span className="font-semibold">WEBP</span> or <span className="font-semibold">GIF</span> up to <span className="font-semibold">100MB</span>
                    </p>
                </div>
            </div>
        </div>
    ) : (
        <>
            <div className="w-full flex flex-col grow justify-center items-center gap-4 px-4">
                {images.map((image) => (
                    <div key={image.name} className="w-full max-w-xl flex items-center justify-between gap-8 p-4 bg-card shadow-card rounded-md">
                        <div className="flex items-center gap-4">
                            <a href={image.preview} target="_blank" rel="noreferrer" className="relative flex justify-center items-center group">
                                <SquareArrowOutUpRight className="absolute opacity-0 transition-all group-hover:opacity-100" />
                                <img src={image.preview} alt={image.name} className="shadow-card h-28 transition-all hover:opacity-40 " />
                            </a>
                            <div className="flex flex-col">
                                <p className="text-muted-foreground text-base md:text-lg">{image.name}</p>
                                <p className="text-muted-foreground text-base md:text-lg">{bytesToSize(image.size)}</p>
                                {image.id && (
                                    <a href={image.url} target="_blank" rel="noreferrer" className="text-primary underline text-base md:text-lg">
                                        {image.id}
                                    </a>
                                )}
                            </div>
                        </div>
                        <Button variant="outline" className="p-3 h-auto" onClick={() => setImages(images.filter((i) => i !== image))}>
                            <Trash2 className="h-6 w-6" />
                        </Button>
                    </div>
                ))}
            </div>
            <div className="w-full sticky bottom-0 flex flex-col items-center">
                <div className="w-full p-6 flex flex-col items-center gap-6 backdrop-blur-xl z-10" style={{ mask: "linear-gradient(to bottom, transparent, black 4%)" }}>
                    <Progress value={uploadProgress} className="max-w-4xl" />
                    <div className="flex gap-4">
                        <Button size="lg" variant="outline" onClick={() => cancelUpload()} disabled={uploadStatus === "uploading"}>
                            Cancel
                        </Button>
                        <Button size="lg" onClick={() => uploadImages()} disabled={["uploading", "done"].includes(uploadStatus)}>
                            {uploadStatus === "uploading" ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ImageUp className="mr-2 h-5 w-5" />}
                            Upload
                        </Button>
                    </div>
                </div>
                <Button variant="link" size="icon" className={cn("absolute -top-6 z-0 h-14 flex pt-6 transition-all opacity-0", !isAtBottom && "opacity-100 -top-14")} onClick={() => window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })}>
                    <span className="sr-only">scroll to bottom</span>
                    <ChevronsDown className="h-12 w-12 stroke-primary animate-bounce" />
                </Button>
            </div>
        </>
    );
}
