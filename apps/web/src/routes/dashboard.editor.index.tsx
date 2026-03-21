import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/editor/")({
  beforeLoad: ({ search }) => {
    const lastId = localStorage.getItem("lastFileId");
    if (!lastId) {
      toast.info("Please select a dataset to edit.");
    }
    throw redirect({
      to: lastId ? "/dashboard/editor/$fileId" : "/dashboard/library",
      params: lastId ? { fileId: lastId } : undefined,
    });
  },
});
