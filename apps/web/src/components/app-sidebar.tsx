import { Link } from "@tanstack/react-router";
import { ChartColumnBig, type icons } from "lucide-react";
import { Icon } from "./icon";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";

const navitems = [
  { title: "Dashboard", icon: "LayoutDashboard", url: "/dashboard" },
  { title: "Data Table", icon: "Table2", url: "/dashboard/data-table" },
  { title: "Settings", icon: "Settings", url: "/dashboard/settings" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="bg-background! p-3 pr-1" variant="floating" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/" className="px-3 py-5">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <ChartColumnBig className="size-5!" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold text-lg">Grid To Graph</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-0.5">
            {navitems.map((item) => {
              const isActive = false;
              return (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    className="py-5 px-3"
                  >
                    <Link to={item.url} className="font-medium text-lg">
                      <Icon
                        name={item.icon as keyof typeof icons}
                        className="size-4.5!"
                      />
                      {item.title}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
