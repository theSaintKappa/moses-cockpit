import type { DocumentTimestamps } from "@/lib/types";
import { type Document, type Model, Schema, model, models } from "mongoose";

export interface IPic extends Document, DocumentTimestamps {
    id: string;
    url: string;
    submitterId: string;
    size: number;
    dimensions: { width: number; height: number };
    contentType: string;
}

const schema = new Schema<IPic>(
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
    },
    { timestamps: true, versionKey: false },
);

export const Pic = (models["moses.pics"] as Model<IPic>) || model<IPic>("moses.pics", schema);
