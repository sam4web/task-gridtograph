import { Model } from "mongoose";
import { Dataset, type IDataset } from "../mongodb";

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
    return this.model
      .find({ userId })
      .select("-data")
      .sort({ createdAt: -1 })
      .exec();
  }

  async create(payload: Partial<IDataset>): Promise<IDataset> {
    return this.model.create(payload);
  }

  async findById(fileId: string): Promise<IDataset | null> {
    return this.model.findById(fileId).exec();
  }

  async addRows(
    fileId: string,
    newRows: Record<string, any>[],
  ): Promise<IDataset | null> {
    return this.model
      .findByIdAndUpdate(
        fileId,
        { $push: { data: { $each: newRows } } },
        { new: true },
      )
      .exec();
  }

  async updateMetadata(
    fileId: string,
    update: Partial<IDataset>,
  ): Promise<IDataset | null> {
    return this.model
      .findByIdAndUpdate(fileId, { $set: update }, { new: true })
      .exec();
  }

  async deleteById(fileId: string): Promise<boolean> {
    const result = await this.model.findByIdAndDelete(fileId).exec();
    return result !== null;
  }

  async updateRow(
    fileId: string,
    rowIndex: number,
    rowData: Record<string, any>,
  ): Promise<IDataset | null> {
    const updateKey = `data.${rowIndex}`;
    return this.model
      .findByIdAndUpdate(
        fileId,
        { $set: { [updateKey]: rowData } },
        { new: true },
      )
      .exec();
  }

  async deleteRow(fileId: string, rowIndex: number): Promise<IDataset | null> {
    const unsetKey = `data.${rowIndex}`;
    await this.model.findByIdAndUpdate(fileId, { $set: { [unsetKey]: null } });
    return this.model
      .findByIdAndUpdate(fileId, { $pull: { data: null } }, { new: true })
      .exec();
  }
}

export const datasetRepository = new DatasetRepository(Dataset);
