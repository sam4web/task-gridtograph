import type { IApiResponse } from "@repo/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { apiClient } from "~/lib/api-client";

export interface IDataset {
  _id: string;
  userId: string;
  fileName: string;
  columns: string[];
  createdAt: string;
  updatedAt: string;
}

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
        error?.response?.data?.message || "Failed to delete the dataset.";
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
      localStorage.setItem("lastFileId", newDataset._id);
      navigate({
        to: "/dashboard/visualize/$fileId",
        params: { fileId: newDataset._id },
      });
    },
    onError: (error: any) => {
      const message = error?.response?.message || "Upload failed.";
      toast.error(message);
    },
  });
};
