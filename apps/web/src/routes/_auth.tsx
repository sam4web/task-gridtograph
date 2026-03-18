import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth")({
  component: AuthRouteComponet,
});

function AuthRouteComponet() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-107">
        <Outlet />
      </div>
    </div>
  );
}
