import type { IDataset } from "@repo/database/mongo";
import type { IApiResponse } from "@repo/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { apiClient } from "~/lib/api-client";

const BASE_URL = "/datasets";

export const useGetDatasets = () => {
  return useQuery({
    queryKey: ["datasets"],
    queryFn: async () => {
      return apiClient.get<IApiResponse<IDataset[]>, IDataset[]>(BASE_URL);
    },
  });
};

export const useDeleteDataset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (fileId: string) => {
      return apiClient.delete<IApiResponse<null>, null>(
        `${BASE_URL}/${fileId}`,
      );
    },
    onSuccess: () => {
      toast.success("Dataset deleted successfully.");
      queryClient.invalidateQueries({ queryKey: ["datasets"] });
    },
    onError: (error: any) => {
      const message =
        error?.response?.message || "Failed to delete the dataset.";
      toast.error(message);
    },
  });
};

export const useUploadDataset = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append("dataset", file);
      return apiClient.post<IApiResponse<IDataset>, IDataset>(
        "/datasets/upload",
        formData,
      );
    },
    onSuccess: (newDataset) => {
      toast.success("File processed! Redirecting...");
      queryClient.setQueryData<IDataset[]>(["datasets"], (old) => [
        newDataset,
        ...(old || []),
      ]);
      localStorage.setItem("lastFileId", newDataset._id.toString());
      navigate({
        to: "/dashboard/visualize/$fileId",
        params: { fileId: newDataset._id.toString() },
      });
    },
    onError: (error: any) => {
      const message = error?.response?.message || "Failed to upload dataset.";
      toast.error(message);
    },
  });
};

export const useGetDatasetById = (id: string) => {
  return useQuery({
    queryKey: ["datasets", id],
    queryFn: async () => {
      return apiClient.get<IApiResponse<IDataset>, IDataset>(
        `${BASE_URL}/${id}`,
      );
    },
    enabled: !!id,
  });
};

export const useAddRow = (fileId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRow: Record<string, any>) => {
      return apiClient.post(`${BASE_URL}/${fileId}`, { rows: [newRow] });
    },
    onSuccess: () => {
      toast.success("Row added.");
      queryClient.invalidateQueries({ queryKey: ["datasets", fileId] });
    },
    onError: (error: any) => {
      const message = error?.response?.message || "Failed to add row.";
      toast.error(message);
    },
  });
};

export const useUpdateRow = (fileId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      rowId,
      data,
    }: {
      rowId: string;
      data: Record<string, any>;
    }) => {
      return apiClient.put(`${BASE_URL}/${fileId}/rows/${rowId}`, data);
    },
    onSuccess: () => {
      toast.success("Row updated.");
      queryClient.invalidateQueries({ queryKey: ["datasets", fileId] });
    },
    onError: (error: any) => {
      const message = error?.response?.message || "Failed to update row.";
      toast.error(message);
    },
  });
};

export const useDeleteRow = (fileId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rowId: string) => {
      return apiClient.delete(`${BASE_URL}/${fileId}/rows/${rowId}`);
    },
    onSuccess: () => {
      toast.success("Row deleted.");
      queryClient.invalidateQueries({ queryKey: ["datasets", fileId] });
    },
    onError: (error: any) => {
      const message = error?.response?.message || "Failed to delete row.";
      toast.error(message);
    },
  });
};
