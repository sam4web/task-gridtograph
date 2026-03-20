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
    rowIndex: number,
    rowData: Record<string, any>,
  ): Promise<IDataset | null>;
  deleteRow(fileId: string, rowIndex: number): Promise<IDataset | null>;
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
      if (!updated) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      return updated;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError("Failed to append rows to dataset.", error);
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

  async updateRow(
    fileId: string,
    rowIndex: number,
    rowData: Record<string, any>,
  ): Promise<IDataset> {
    try {
      const updateKey = `data.${rowIndex}`;
      const updated = await this.model
        .findByIdAndUpdate(
          fileId,
          { $set: { [updateKey]: rowData } },
          { new: true },
        )
        .exec();
      if (!updated) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      return updated;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError(
        `Failed to update row at index ${rowIndex}.`,
        error,
      );
    }
  }

  async deleteRow(fileId: string, rowIndex: number): Promise<IDataset> {
    try {
      const unsetKey = `data.${rowIndex}`;
      // unset the element at index
      const unset = await this.model
        .findByIdAndUpdate(fileId, { $set: { [unsetKey]: null } })
        .exec();
      if (!unset) {
        throw new RecordNotFoundError("Dataset", fileId);
      }
      // pull null to collapse the array
      const final = await this.model
        .findByIdAndUpdate(fileId, { $pull: { data: null } }, { new: true })
        .exec();

      return final as IDataset;
    } catch (error) {
      if (error instanceof RecordNotFoundError) throw error;
      throw new DatabaseError(
        `Failed to delete row at index ${rowIndex}.`,
        error,
      );
    }
  }
}
export const datasetRepository = new DatasetRepository(Dataset);
