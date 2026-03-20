import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/editor")({
  component: EditorRedirectComponent,
});

function EditorRedirectComponent() {
  return <div>Hello "/dashboard/editor"!</div>;
}
