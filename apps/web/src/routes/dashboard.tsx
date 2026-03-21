import {
  createFileRoute,
  Outlet,
  redirect,
  useLocation,
} from "@tanstack/react-router";
import { Fragment } from "react";
import { AppSidebar } from "~/components/app-sidebar";
import { ThemeToggle } from "~/components/theme-toggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Separator } from "~/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "~/components/ui/sidebar";
import { useAuthStore } from "~/store/auth-store";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: () => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      throw redirect({
        to: "/login",
      });
    }
  },
  component: DashboardRouteComponent,
});

function DashboardRouteComponent() {
  const { pathname } = useLocation();
  const paths = pathname
    .split("/")
    .filter((path) => path && path !== "dashboard");

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "19rem",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset className="flex flex-col h-full overflow-hidden">
        <header className="flex justify-between items-center h-16 px-5 border-b border-border/40">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-5 data-[orientation=vertical]:self-center bg-foreground/35"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
                {paths.map((path) => {
                  const label = path
                    .replace(/-/g, " ")
                    .replace(/\b\w/g, (char) => char.toUpperCase());
                  return (
                    <Fragment key={path}>
                      <BreadcrumbSeparator className="hidden md:block" />
                      <BreadcrumbItem>
                        <BreadcrumbPage>{label}</BreadcrumbPage>
                      </BreadcrumbItem>
                    </Fragment>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <ThemeToggle />
        </header>

        <div className="flex-1 overflow-y-auto w-full">
          <div className="container mx-auto p-6 min-h-full">
            <Outlet />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
