import type { DocumentTimestamps } from "@/lib/types";
import type { IMosesPic } from "@/models/MosesPic";
import { type Document, type Model, Schema, model, models } from "mongoose";

export interface ICockpitPicToken extends Document, DocumentTimestamps, IMosesPic {
    id: string;
    token: string;
    expireAt: Date;
}

const schema = new Schema<ICockpitPicToken>(
    {
        id: { type: String, required: true, unique: true },
        url: { type: String, required: true },
        submitterId: { type: String, required: true },
        size: { type: Number, required: true },
        dimensions: {
            width: { type: Number, required: true },
            height: { type: Number, required: true },
        },
        contentType: { type: String, required: true },
        token: { type: String, required: true },
        expireAt: { type: Date, default: Date.now, index: { expires: "5m" } },
    },
    { timestamps: true, versionKey: false },
);

export const CockpitPicToken = models["cockpit.picTokens"] || model<ICockpitPicToken>("cockpit.picTokens", schema, "cockpit.picTokens");
