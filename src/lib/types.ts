import type { RESTGetAPIUserResult } from "discord-api-types/v10";

export interface ImageApiResponse {
    id: string;
    url: string;
    [key: string]: unknown;
}

export type APIUserProfile = RESTGetAPIUserResult & { avatar_url: string };
