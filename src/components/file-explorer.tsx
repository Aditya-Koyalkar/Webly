import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { useMemo, useCallback, Fragment, useState } from "react";
import { Hint } from "./hint";
import { CodeView } from "./code-view";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { Button } from "./ui/button";
import { convertFilesToTreeItems } from "@/lib/utils";
import { TreeView } from "./tree-view";
import { Breadcrumb, BreadcrumbEllipsis, BreadcrumbItem, BreadcrumbList, BreadcrumbSeparator } from "./ui/breadcrumb";

type FileCollection = {
  [path: string]: string;
};

function getLanguagefromExtension(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase() || "";
  return extension || "text";
}
interface FileExplorerProps {
  files: FileCollection;
}

export const FileExplorer = ({ files }: FileExplorerProps) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(() => {
    const fileKeys = Object.keys(files);
    return fileKeys.length > 0 ? fileKeys[0] : null;
  });
  const [copied, setCopied] = useState(false);
  const treeData = useMemo(() => convertFilesToTreeItems(files), [files]);

  const handleFileSelect = useCallback(
    (filePath: string) => {
      if (files[filePath]) {
        setSelectedFile(filePath);
      }
    },
    [files]
  );

  const handleFileCopy = useCallback(() => {
    if (selectedFile && files[selectedFile]) {
      navigator.clipboard
        .writeText(files[selectedFile])
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000); // Reset copied state after
        })
        .catch((err) => {
          console.error("Failed to copy file content: ", err);
        });
    }
  }, [selectedFile, files]);
  return (
    <ResizablePanelGroup direction="horizontal">
      <ResizablePanel defaultSize={30} minSize={30} className="bg-sidebar">
        <TreeView data={treeData} selectedFile={selectedFile} onSelectFile={handleFileSelect} />
      </ResizablePanel>
      <ResizableHandle className="hover:bg-primary transition-colors" />
      <ResizablePanel defaultSize={70} minSize={50}>
        {selectedFile && files[selectedFile] ? (
          <div className="flex flex-col h-full w-full">
            <div className="border-b bg-sidebar px-4 py-2 flex justify-between items-center gap-x-2">
              <FileBreadcrumbs filePath={selectedFile} />
              <Hint text="Copy to clipboard" side="bottom" align="start">
                <Button size={"icon"} className="ml-auto" variant={"outline"} onClick={handleFileCopy} disabled={copied}>
                  {copied ? <CopyCheckIcon /> : <CopyIcon />}
                </Button>
              </Hint>
            </div>
            <div className="flex-1 overflow-y-auto">
              <CodeView code={files[selectedFile]} lang={getLanguagefromExtension(selectedFile)} />
            </div>
          </div>
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">Select a file to view its content</div>
        )}
      </ResizablePanel>
    </ResizablePanelGroup>
  );
};

const FileBreadcrumbs = ({ filePath }: { filePath: string }) => {
  const pathSegments = filePath.split("/").filter(Boolean);
  const maxSegments = 4;
  const renderBreadcrimbsItems = () => {
    if (pathSegments.length <= maxSegments) {
      return pathSegments.map((segment, index) => {
        const isLast = index === pathSegments.length - 1;
        return (
          <Fragment key={index}>
            {isLast ? (
              <BreadcrumbItem className="font-medium">{segment}</BreadcrumbItem>
            ) : (
              <BreadcrumbItem className="text-muted-foreground">{segment}</BreadcrumbItem>
            )}
            {!isLast && <BreadcrumbSeparator />}
          </Fragment>
        );
      });
    } else {
      const firstSegment = pathSegments[0];
      const lastSegment = pathSegments[pathSegments.length - 1];
      return (
        <>
          <BreadcrumbItem className="text-muted-foreground">{firstSegment}</BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="text-muted-foreground">
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem className="font-medium">{lastSegment}</BreadcrumbItem>
        </>
      );
    }
  };
  return (
    <Breadcrumb>
      <BreadcrumbList>{renderBreadcrimbsItems()}</BreadcrumbList>
    </Breadcrumb>
  );
};
