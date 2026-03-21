import { createFileRoute, redirect } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/editor/")({
  beforeLoad: ({ search }) => {
    const lastId = localStorage.getItem("lastFileId");
    toast.info("Please select a dataset to edit.");
    throw redirect({
      to: lastId ? "/dashboard/analytics/$fileId" : "/dashboard/library",
      params: lastId ? { fileId: lastId } : undefined,
    });
  },
});
