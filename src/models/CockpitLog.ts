import type { Log } from "@/app/actions/logs";
import { type Document, Schema, model, models } from "mongoose";

export interface ICockpitLog extends Log, Document {}

const schema = new Schema<ICockpitLog>(
    {
        action: { type: String, required: true },
        metadata: { type: Schema.Types.Mixed, required: true },
    },
    { timestamps: false, versionKey: false },
);

export const CockpitLog = models["cockpit.logs"] || model<ICockpitLog>("cockpit.logs", schema, "cockpit.logs");
