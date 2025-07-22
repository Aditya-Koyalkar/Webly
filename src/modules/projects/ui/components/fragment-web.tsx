import { Button } from "@/components/ui/button";
import { Fragment } from "@/generated/prisma";
import { da } from "date-fns/locale";
import { RefreshCcwIcon } from "lucide-react";
import { useState } from "react";

interface Props {
  data: Fragment;
}

export const FragementWeb = ({ data }: Props) => {
  const [copied, setCopied] = useState(false);
  const [fragmentKey, setFragmentKey] = useState<number>(0);

  const handleCopy = () => {
    navigator.clipboard.writeText(data.sandboxUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const onRefresh = () => {
    setFragmentKey((prev) => prev + 1);
  };
  return (
    <div className="flex flex-col w-full h-full">
      <div className="p-2 border-b bg-sidebar flex items-center gap-x-2">
        <Button size={"sm"} variant={"outline"} onClick={onRefresh}>
          <RefreshCcwIcon />
        </Button>
        <Button
          disabled={!data.sandboxUrl || copied}
          size={"sm"}
          variant={"outline"}
          onClick={handleCopy}
          className="flex-1 justify-start  font-normal"
        >
          <span className="truncate">{data.sandboxUrl}</span>
        </Button>{" "}
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => {
            if (data.sandboxUrl) window.open(data.sandboxUrl, "_blank");
          }}
        >
          Open in new tab
        </Button>
      </div>
      <iframe
        key={fragmentKey}
        className="w-full h-full"
        sandbox="allow-scripts allow-same-origin allow-forms"
        loading="lazy"
        src={data.sandboxUrl}
      />
    </div>
  );
};
