import { TreeItem } from "@/types";
import { Sidebar, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./ui/sidebar";
import { ChevronRightIcon, FileIcon, FolderIcon } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface TreeViewProps {
  data: TreeItem[];
  selectedFile: string | null;
  onSelectFile: (filePath: string) => void;
}

export const TreeView = ({ data, selectedFile, onSelectFile }: TreeViewProps) => {
  return (
    <SidebarProvider>
      <Sidebar collapsible="none" className="w-full">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.map((item, index) => (
                <Tree key={index} item={item} selectedFile={selectedFile} onSelectFile={onSelectFile} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </Sidebar>
    </SidebarProvider>
  );
};

interface TreeProps {
  item: TreeItem;
  selectedFile: string | null;
  onSelectFile: (filePath: string) => void;
  parentPath?: string;
}

const Tree = ({ item, selectedFile, onSelectFile, parentPath }: TreeProps) => {
  const [name, ...items] = Array.isArray(item) ? item : [item];
  const currentPath = parentPath ? `${parentPath}/${name}` : name;
  if (!items.length) {
    const isSelected = selectedFile === currentPath;
    return (
      <SidebarMenuButton isActive={isSelected} className="data-[active=true]:bg-transparent" onClick={() => onSelectFile(currentPath)}>
        <FileIcon />
        <span className="truncate">{name}</span>
      </SidebarMenuButton>
    );
  }
  return (
    <SidebarMenuItem>
      <Collapsible className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90" defaultOpen>
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRightIcon className="transition-transform" />
            <FolderIcon />
            <span>{name}</span>
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          {items.map((childItem, index) => (
            <Tree key={`${currentPath}-${index}`} item={childItem} selectedFile={selectedFile} onSelectFile={onSelectFile} parentPath={currentPath} />
          ))}
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
