import type { LogAction } from "@prisma/client";

// Pics upload
export const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
export const ALLOWED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg", "image/webp", "image/gif"];

export const logStrings: Record<LogAction, string> = {
    image_upload: "uploaded an image",
    moses_quote_add: "added a Moses quote",
    pt_quote_add: "added a pT quote",
    presence_change: "changed the bot presence",
};
