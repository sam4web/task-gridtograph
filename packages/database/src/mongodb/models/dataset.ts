import { type Document, model, Schema } from "mongoose";

export interface IDataset extends Document {
  userId: string;
  fileName: string;
  columns: string[];
  data: Record<string, any>[];
  createdAt: Date;
  updatedAt: Date;
}

const datasetSchema = new Schema<IDataset>(
  {
    userId: { type: String, required: true, index: true },
    fileName: { type: String, required: true },
    columns: [{ type: String }],
    data: [{ type: Schema.Types.Mixed }],
  },
  { timestamps: true },
);

export const Dataset = model<IDataset>("IDataset", datasetSchema);
