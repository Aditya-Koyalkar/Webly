"use client";
import Link from "next/link";
import Image from "next/image";
import { useTRPC } from "@/trpc/client";
import { useQuery } from "@tanstack/react-query";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, useSidebar } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { DashboardUserButton } from "./user-button";
import { Button } from "@/components/ui/button";
import { PanelLeftCloseIcon } from "lucide-react";
export const ProjectsList = () => {
  const trpc = useTRPC();
  const { toggleSidebar } = useSidebar();
  const { data: projects, isLoading } = useQuery(trpc.projects.getMany.queryOptions());

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <div className="flex items-center gap-2 px-2 pt-2">
          <Button className="size-9 border-foreground/50" variant={"outline"} onClick={toggleSidebar}>
            <PanelLeftCloseIcon className="size-4" />
          </Button>
          <p className="text-2xl font-semibold !text-primary">Your Projects</p>
        </div>
      </SidebarHeader>
      <div className="px-4 py-2 ">
        <Separator className="text-accent-foreground" />
      </div>
      <SidebarContent>
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading projects...</p>
          </div>
        ) : projects?.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground"> Create a new project to get started.</p>
          </div>
        ) : null}
        <SidebarMenu className="gap-y-2 overflow-y-auto">
          {projects?.map((project) => (
            <SidebarMenuButton key={project.id} asChild>
              <Link href={`/projects/${project.id}`} className="flex items-center gap-2">
                <Image src="/logo.svg" alt="Project Icon" width={24} height={24} />
                <span className="text-sm">{project.name}</span>
              </Link>
            </SidebarMenuButton>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* <DashboardTrail /> */}
        <DashboardUserButton />
      </SidebarFooter>
    </Sidebar>
  );
};
