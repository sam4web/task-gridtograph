import type { Model } from "mongoose";
import { Dataset, type IDataset } from "../mongodb";
import { DatabaseError, RecordNotFoundError } from "../shared/error";

export interface IDatasetRepository {
  findAll(userId: string): Promise<IDataset[]>;
  create(payload: Partial<IDataset>): Promise<IDataset>;
  findById(fileId: string): Promise<IDataset | null>;
  addRows(
    fileId: string,
    newRows: Record<string, any>[],
  ): Promise<IDataset | null>;
  updateMetadata(
    fileId: string,
    update: Partial<IDataset>,
  ): Promise<IDataset | null>;
  deleteById(fileId: string): Promise<boolean>;
  updateRow(
    fileId: string,
    rowId: string,
    rowData: Record<string, any>,
  ): Promise<IDataset>;
  deleteRow(fileId: string, rowId: string): Promise<IDataset>;
}

export class DatasetRepository implements IDatasetRepository {
  constructor(private readonly model: Model<IDataset>) {}

  async findAll(userId: string): Promise<IDataset[]> {
    try {
      return await this.model
        .find({ userId })
        .select("-data")
        .sort({ createdAt: -1 })
        .exec();
    } catch (error) {
      throw new DatabaseError("Failed to fetch datasets for user.", error);
    }
  }

  async create(payload: Partial<IDataset>): Promise<IDataset> {
    try {
      return await this.model.create(payload);
    } catch (error) {
      throw new DatabaseError("Failed to create dataset record.", error);
    }
  }

  async findById(fileId: string): Promise<IDataset> {
    try {
      const dataset = await this.model.findById(fileId).exec();
      if (!dataset) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      return dataset;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to fetch dataset by ID.", error);
    }
  }

  async addRows(
    fileId: string,
    newRows: Record<string, any>[],
  ): Promise<IDataset> {
    try {
      const updated = await this.model
        .findByIdAndUpdate(
          fileId,
          { $push: { data: { $each: newRows } } },
          { new: true },
        )
        .exec();
      if (!updated) throw new RecordNotFoundError("Dataset", fileId);
      return updated;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to append rows to dataset.", error);
    }
  }

  async updateRow(
    fileId: string,
    rowId: string,
    rowData: Record<string, any>,
  ): Promise<IDataset> {
    try {
      const safeData = { ...rowData, _id: rowId };
      const updated = await this.model
        .findOneAndUpdate(
          { _id: fileId, "data._id": rowId },
          { $set: { "data.$": safeData } },
          { new: true },
        )
        .exec();

      if (!updated) {
        throw new RecordNotFoundError("Dataset or Row", fileId);
      }
      return updated;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError(`Failed to update row with ID ${rowId}.`, error);
    }
  }

  async deleteRow(fileId: string, rowId: string): Promise<IDataset> {
    try {
      const updated = await this.model
        .findByIdAndUpdate(
          fileId,
          { $pull: { data: { _id: rowId } } },
          { new: true },
        )
        .exec();

      if (!updated) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      return updated;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError(`Failed to delete row with ID ${rowId}.`, error);
    }
  }

  async updateMetadata(
    fileId: string,
    update: Partial<IDataset>,
  ): Promise<IDataset> {
    try {
      const updated = await this.model
        .findByIdAndUpdate(fileId, { $set: update }, { new: true })
        .exec();
      if (!updated) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      return updated;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to update dataset metadata.", error);
    }
  }

  async deleteById(fileId: string): Promise<boolean> {
    try {
      const result = await this.model.findByIdAndDelete(fileId).exec();
      if (!result) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      return result !== null;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to delete dataset.", error);
    }
  }
}
export const datasetRepository = new DatasetRepository(Dataset);
