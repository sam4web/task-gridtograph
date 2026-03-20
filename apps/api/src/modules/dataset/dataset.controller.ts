import type { IDataset } from "@repo/database/mongo";
import { HTTP_STATUS } from "@repo/shared";
import type { NextFunction, Request, Response } from "express";
import type { UploadedFile } from "express-fileupload";
import { ApiError, ApiResponse } from "../../lib";
import { datasetService } from "./dataset.service";

class DatasetController {
  public async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const datasets = await datasetService.getAllDatasets(req.userId!);
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            "Datasets retrieved successfully.",
            datasets,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.files || !req.files.dataset) {
        throw ApiError.badRequest(
          "Please upload a valid Excel or CSV file. Field name must be 'dataset'.",
        );
      }
      const file = req.files.dataset as UploadedFile;
      const dataset = await datasetService.processAndUploadDataset(
        req.userId!,
        file,
      );
      return res
        .status(HTTP_STATUS.CREATED)
        .json(
          new ApiResponse(
            HTTP_STATUS.CREATED,
            "Dataset uploaded and processed successfully.",
            dataset,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId } = req.validatedParams as { fileId: string };
      const dataset = await datasetService.getDatasetById(req.userId!, fileId);
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            "Dataset retrieved successfully.",
            dataset,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async addRows(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId } = req.validatedParams as { fileId: string };
      const { rows } = req.validatedBody as { rows: Record<string, any>[] };
      const dataset = await datasetService.addRows(req.userId!, fileId, rows);
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            "Rows appended successfully.",
            dataset,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async updateMetadata(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId } = req.validatedParams as { fileId: string };
      const updateData = req.validatedBody as Partial<IDataset>;
      const dataset = await datasetService.updateMetadata(
        req.userId!,
        fileId,
        updateData,
      );
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            "Dataset metadata updated successfully.",
            dataset,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async deleteById(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId } = req.validatedParams as { fileId: string };
      await datasetService.deleteDataset(req.userId!, fileId);
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(
            HTTP_STATUS.OK,
            "Dataset deleted successfully.",
            null,
          ),
        );
    } catch (err) {
      next(err);
    }
  }

  public async updateRow(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId, rowId } = req.validatedParams as {
        fileId: string;
        rowId: string;
      };
      const rowData = req.validatedBody as Record<string, any>;
      const rowIndex = parseInt(rowId, 10);

      if (isNaN(rowIndex)) {
        throw ApiError.badRequest("Row ID must be a valid numeric index.");
      }
      const dataset = await datasetService.updateRow(
        req.userId!,
        fileId,
        rowIndex,
        rowData,
      );
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(HTTP_STATUS.OK, "Row updated successfully.", dataset),
        );
    } catch (err) {
      next(err);
    }
  }

  public async deleteRow(req: Request, res: Response, next: NextFunction) {
    try {
      const { fileId, rowId } = req.validatedParams as {
        fileId: string;
        rowId: string;
      };

      const rowIndex = parseInt(rowId, 10);
      if (isNaN(rowIndex)) {
        throw ApiError.badRequest("Row ID must be a valid numeric index.");
      }
      const dataset = await datasetService.deleteRow(
        req.userId!,
        fileId,
        rowIndex,
      );
      return res
        .status(HTTP_STATUS.OK)
        .json(
          new ApiResponse(HTTP_STATUS.OK, "Row deleted successfully.", dataset),
        );
    } catch (err) {
      next(err);
    }
  }
}

export const datasetController = new DatasetController();
