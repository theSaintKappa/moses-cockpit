import type { DocumentTimestamps } from "@/lib/types";
import type { IPic } from "@/models/Pic";
import { type Document, type Model, Schema, model, models } from "mongoose";

export interface IPicToken extends Document, DocumentTimestamps, IPic {
    id: string;
    token: string;
    expireAt: Date;
}

const schema = new Schema<IPicToken>(
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

export const PicToken = (models["cockpit.picTokens"] as Model<IPicToken>) || model<IPicToken>("cockpit.picTokens", schema);
