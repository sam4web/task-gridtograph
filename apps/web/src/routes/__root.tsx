import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "~/components/theme-provider";
import { Toaster } from "~/components/ui/sonner";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="preferred-theme">
      <Toaster position="bottom-right" richColors />
      <main className="min-h-dvh h-full w-full">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
