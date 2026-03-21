import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/analytics/")({
  beforeLoad: ({ search }) => {
    const lastId = localStorage.getItem("lastFileId");
    throw redirect({
      to: lastId ? "/dashboard/analytics/$fileId" : "/dashboard/library",
      params: lastId ? { fileId: lastId } : undefined,
    });
  },
});
