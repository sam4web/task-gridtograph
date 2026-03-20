import { Link } from "@tanstack/react-router";
import { ChartColumnBig, type icons } from "lucide-react";
import { useUploadModal } from "~/hooks/use-upload-modal";
import { Icon } from "./icon";
import { Button } from "./ui/button";
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
  { title: "Library", icon: "Database", url: "/dashboard/library" },
  { title: "Editor", icon: "SquarePen", url: "/dashboard/editor" },
  { title: "Settings", icon: "Settings", url: "/dashboard/settings" },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const onOpen = useUploadModal((state) => state.onOpen);

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
      <SidebarContent className="flex flex-col justify-between">
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
        <SidebarGroup className="py-5 px-3">
          <Button onClick={onOpen} className="cursor-pointer" type="button">
            Upload File
          </Button>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
