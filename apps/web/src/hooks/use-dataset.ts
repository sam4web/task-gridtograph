import type { IApiResponse } from "@repo/shared";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
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
