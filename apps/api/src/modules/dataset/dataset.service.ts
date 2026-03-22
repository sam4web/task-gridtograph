import { DatabaseError } from "@repo/database/error";
import type { IDataset } from "@repo/database/mongo";
import { Types } from "@repo/database/mongo";
import { datasetRepository } from "@repo/database/repositories";
import type { UploadedFile } from "express-fileupload";
import * as xlsx from "xlsx";
import { ApiError } from "../../lib";

export class DatasetService {
  public async getAllDatasets(userId: string): Promise<IDataset[]> {
    return datasetRepository.findAll(userId);
  }

  public async processAndUploadDataset(
    userId: string,
    file: UploadedFile,
  ): Promise<IDataset> {
    if (!file || !file.data) {
      throw ApiError.badRequest("No file uploaded or file data is empty.");
    }
    try {
      const workbook = xlsx.read(file.data, { type: "buffer" });
      const sheetName = workbook.SheetNames[0];
      if (!sheetName) {
        throw ApiError.badRequest(
          "The uploaded Excel file appears to be empty.",
        );
      }
      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet) {
        throw ApiError.badRequest("Could not read the first worksheet.");
      }
      const rawData = xlsx.utils.sheet_to_json<Record<string, any>>(worksheet, {
        raw: false,
      });

      let columns: string[] = [];
      if (rawData.length > 0) {
        const firstRow = rawData[0];
        if (firstRow) {
          columns = Object.keys(firstRow);
        }
      }

      const dataWithIds = rawData.map((row) => ({
        _id: new Types.ObjectId().toString(),
        ...row,
      }));

      const datasetPayload = {
        userId,
        fileName: file.name,
        columns,
        data: dataWithIds,
      };

      return await datasetRepository.create(datasetPayload);
    } catch (error) {
      console.error("ROOT CAUSE:", error);
      if (error instanceof ApiError) throw error;
      throw new DatabaseError(
        "Failed to process and save the Excel file.",
        error,
      );
    }
  }

  private async getDatasetAndVerifyOwnership(
    fileId: string,
    userId: string,
  ): Promise<IDataset> {
    const dataset = await datasetRepository.findById(fileId);
    if (!dataset) {
      throw ApiError.notFound("Dataset not found.");
    }
    if (dataset.userId !== userId) {
      throw ApiError.forbidden(
        "You do not have permission to access this dataset.",
      );
    }
    return dataset;
  }

  public async getDatasetById(
    userId: string,
    fileId: string,
  ): Promise<IDataset> {
    return this.getDatasetAndVerifyOwnership(fileId, userId);
  }

  public async updateMetadata(
    userId: string,
    fileId: string,
    updateData: Partial<IDataset>,
  ): Promise<IDataset> {
    await this.getDatasetAndVerifyOwnership(fileId, userId);
    delete updateData.userId;
    delete updateData.data;
    const updatedDataset = await datasetRepository.updateMetadata(
      fileId,
      updateData,
    );
    if (!updatedDataset) {
      throw ApiError.notFound("Dataset not found after update.");
    }
    return updatedDataset;
  }

  public async deleteDataset(userId: string, fileId: string): Promise<void> {
    await this.getDatasetAndVerifyOwnership(fileId, userId);
    await datasetRepository.deleteById(fileId);
  }

  public async addRows(
    userId: string,
    fileId: string,
    newRows: Record<string, any>[],
  ): Promise<IDataset> {
    await this.getDatasetAndVerifyOwnership(fileId, userId);

    const rowsWithIds = newRows.map((row) => ({
      _id: new Types.ObjectId().toString(),
      ...row,
    }));

    const updatedDataset = await datasetRepository.addRows(fileId, rowsWithIds);
    if (!updatedDataset) {
      throw ApiError.notFound("Dataset not found after update.");
    }
    return updatedDataset;
  }

  public async updateRow(
    userId: string,
    fileId: string,
    rowId: string,
    rowData: Record<string, any>,
  ): Promise<IDataset> {
    await this.getDatasetAndVerifyOwnership(fileId, userId);
    const updatedDataset = await datasetRepository.updateRow(
      fileId,
      rowId,
      rowData,
    );
    if (!updatedDataset) {
      throw ApiError.notFound("Dataset not found after row update.");
    }
    return updatedDataset;
  }

  public async deleteRow(
    userId: string,
    fileId: string,
    rowId: string,
  ): Promise<IDataset> {
    await this.getDatasetAndVerifyOwnership(fileId, userId);
    const updatedDataset = await datasetRepository.deleteRow(fileId, rowId);
    if (!updatedDataset) {
      throw ApiError.notFound("Dataset not found after row deletion.");
    }
    return updatedDataset;
  }
}

export const datasetService = new DatasetService();
