import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";
import { UploadDatasetsModal } from "~/components/upload-dataset-modal";
import { useUploadModal } from "~/hooks/use-upload-modal";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const { isOpen, onClose } = useUploadModal();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="preferred-theme">
      <Toaster position="bottom-right" richColors />
      <main className="min-h-dvh h-full w-full">
        <Outlet />
      </main>
      <UploadDatasetsModal isOpen={isOpen} onOpenChange={onClose} />
    </ThemeProvider>
  );
}
