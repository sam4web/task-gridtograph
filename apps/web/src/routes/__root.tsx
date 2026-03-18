import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "~/components/theme-provider";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="preferred-theme">
      <main className="min-h-dvh h-full w-full">
        <Outlet />
      </main>
    </ThemeProvider>
  );
}
