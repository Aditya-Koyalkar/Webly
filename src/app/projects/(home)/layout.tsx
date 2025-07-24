import { SidebarProvider } from "@/components/ui/sidebar";
import { ProjectsList } from "@/modules/home/components/projects-list";
import { SidebarToggleButton } from "@/modules/home/components/sidebar-toggle-button";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex min-h-screen max-h-screen">
      <div className="w-64 shrink-0">
        {" "}
        <SidebarProvider>
          <Suspense fallback={<>Loading projects...</>}>
            <ProjectsList />
            <SidebarToggleButton />
          </Suspense>
        </SidebarProvider>
      </div>

      {/* Background Grid */}
      <div className="relative h-full w-full">
        <div className="absolute inset-0 -z-10 h-full w-full bg-background dark:bg-[radial-gradient(#393e4a_1px,transparent_1px)] [background-size:16px_16px]" />
        <div className="flex flex-1 flex-col px-4 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
