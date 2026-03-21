import { z } from "zod";

const objectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, "Invalid File ID format");

export const fileIdParamsSchema = z.object({
  fileId: objectIdSchema,
});

export const rowParamsSchema = z.object({
  fileId: objectIdSchema,
  rowId: z.string().min(1, "Row ID is required"),
});

export const updateRowSchema = z.record(z.string(), z.any());

export const addRowsSchema = z.object({
  rows: z
    .array(z.record(z.string(), z.any()))
    .min(1, "At least one row is required"),
});
