"use client";

import generateSignedURL from "@/app/actions/image-upload";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ImagePlus, Upload } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ErrorCode, type FileError, useDropzone } from "react-dropzone";
import { toast } from "sonner";

type Image = File & { preview: string };

export default function Page() {
    const [images, setImages] = useState<Image[]>([]);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    async function uploadImages() {
        for (const [i, image] of images.entries()) {
            const { url, message, id } = await generateSignedURL(image.type);
            if (!url) return console.error(message);

            // setUploadProgress(((i + 1) / images.length) * 100);
            setUploadProgress(prev => prev + ((i + 1) / images.length) * 100);

            const res = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": image.type },
                body: image,
            });

            if (!res.ok) return console.error("Failed to upload image");

            setUploadProgress(((i + 1) / images.length) * 100);
        }
    }

    const onDrop = useCallback((files: File[]) => {
        setImages(files.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) })));
    }, []);

    const validator = (file: File): FileError | null => {
        const allowedTypes = ["image/png", "image/jpg", "image/webp", "image/gif"];
        if (!allowedTypes.includes(file.type)) return { code: ErrorCode.FileInvalidType, message: "Only images are allowed" };
        return null;
    };

    useEffect(() => {
        return () => {
            for (const image of images) URL.revokeObjectURL(image.preview);
        };
    }, [images]);

    const { fileRejections, getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, validator });

    return (
        <div className="grow p-6 flex flex-col gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink href="/panel">Panel</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbPage className="flex items-center">
                            <ImagePlus className="h-4 min-w-4" /> Moses Pics
                        </BreadcrumbPage>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>
            <main className="grow flex flex-col justify-center items-center gap-8">
                {images.length === 0 ? (
                    <div {...getRootProps()} className={cn("flex flex-col items-center gap-6 p-12 rounded-lg border border-dashed cursor-pointer hover:border-primary hover:border-2 transition-colors shadow-card", isDragActive && "border-primary border-2")}>
                        <input {...getInputProps()} />
                        <Upload className="size-12 md:size-14 stroke-muted-foreground" />
                        <div className="flex flex-col items-center text-muted-foreground text-base md:text-lg text-center">
                            <p>Drag and drop images or click to select</p>
                            <p>
                                <span className="font-semibold">PNG</span>, <span className="font-semibold">JPG</span>, <span className="font-semibold">WEBP</span> or <span className="font-semibold">GIF</span> up to <span className="font-semibold">100MB</span>
                            </p>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="bg-red-400 max-w-md w-full">
                            <ul className="list-none">
                                {images.map((image) => (
                                    <li key={image.name}>
                                        <img src={image.preview} alt={image.name} />
                                        {image.name} - {image.size} bytes
                                        {/* {JSON.stringify(image)} */}
                                    </li>
                                ))}
                                {fileRejections.map(({ file, errors }) => (
                                    <li key={file.name}>
                                        {file.name} - {file.size} bytes
                                        <ul>
                                            {errors.map((error) => (
                                                <li key={error.code}>{error.message}</li>
                                            ))}
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Progress value={uploadProgress} />
                        <Button onClick={() => setImages([])}>Cancel</Button>
                        <Button onClick={() => uploadImages()}>Upload</Button>
                    </>
                )}
            </main>
        </div>
    );
}
