import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { useAuthStore } from "~/store/auth-store";

export const Route = createFileRoute("/_auth")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated) {
      throw redirect({
        to: "/dashboard",
      });
    }
  },
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
