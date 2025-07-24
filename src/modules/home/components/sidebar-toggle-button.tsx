"use client";

import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon } from "lucide-react";

export const SidebarToggleButton = () => {
  const { open, toggleSidebar } = useSidebar();
  if (open) {
    return null; // If the sidebar is open, don't show the button
  }
  return (
    <div className="px-2 pt-2 h-fit w-fit absolute z-20">
      <div className="p-2">
        <Button className="size-9 border-foreground/50" variant={"outline"} onClick={toggleSidebar}>
          <PanelLeftIcon className="size-4" />
        </Button>
      </div>
    </div>
  );
};
