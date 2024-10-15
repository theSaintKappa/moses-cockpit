export interface ImageApiResponse {
    id: string;
    url: string;
    [key: string]: unknown;
}

export interface DocumentTimestamps {
    createdAt: Date;
    updatedAt: Date;
}
