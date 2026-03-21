import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/visualize/")({
  beforeLoad: ({ search }) => {
    const lastId = localStorage.getItem("lastFileId");
    if (!lastId) {
      toast.info("Please select a dataset to visualize.");
    }
    throw redirect({
      to: lastId ? "/dashboard/visualize/$fileId" : "/dashboard/library",
      params: lastId ? { fileId: lastId } : undefined,
    });
  },
});
