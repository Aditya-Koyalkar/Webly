import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ChevronRightIcon, Code2Icon } from "lucide-react";
import Image from "next/image";

interface MessageCardProps {
  content: string;
  role: MessageRole;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
}

export const MessageCard = ({ content, createdAt, fragment, isActiveFragment, onFragmentClick, role, type }: MessageCardProps) => {
  if (role == "ASSISTANT") {
    return (
      <AssistantMessage
        content={content}
        createdAt={createdAt}
        fragment={fragment}
        isActiveFragment={isActiveFragment}
        onFragmentClick={onFragmentClick}
        type={type}
      />
    );
  }
  return <UserMessage content={content} />;
};

const UserMessage = ({ content }: { content: string }) => {
  return (
    <div className="flex justify-end pb-4 pr-2 pl-10">
      <Card className="rounded-lg bg-muted p-3 shadow-none border-none max-w-[80%] break-words">{content}</Card>
    </div>
  );
};
interface AssistantMessageProps {
  content: string;
  fragment: Fragment | null;
  createdAt: Date;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
  type: MessageType;
}
const AssistantMessage = ({ content, createdAt, fragment, isActiveFragment, onFragmentClick, type }: AssistantMessageProps) => {
  return (
    <div className={cn("flex flex-col px-2 pb-6 group", type == "ERROR" && "text-red-700 dark:text-red-500")}>
      <div className="flex items-center gap-2 ">
        <Image src={"/logo.svg"} alt="Webly" width={20} height={20} />
        <span className="text-sm font-medium">Webly</span>
        <span className="text-sm text-muted-foreground opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity">
          {format(createdAt, "HH:mm 'on' MMM dd, yyyy")}
        </span>
      </div>
      <div className="pl-8 flex flex-col gap-y-5">
        <span>{content}</span>
        {fragment && type == "RESULT" && <FragmentCard fragment={fragment} isActiveFragment={isActiveFragment} onFragmentClick={onFragmentClick} />}
      </div>
    </div>
  );
};

interface FragmentCardProps {
  fragment: Fragment;
  isActiveFragment: boolean;
  onFragmentClick: (fragment: Fragment) => void;
}

const FragmentCard = ({ fragment, isActiveFragment, onFragmentClick }: FragmentCardProps) => {
  return (
    <button
      onClick={() => onFragmentClick(fragment)}
      className={cn(
        "flex items-start text-start gap-2 border rounded-lg bg-muted w-fit p-3 hover:bg-secondary tracking-colors",
        isActiveFragment && "bg-primary text-primary-foreground border-primary hover:bg-primary"
      )}
    >
      <Code2Icon className="size-4 mt-0.5" />
      <div className="flex flex-col flex-1">
        <span className="text-sm font-medium line-clamp-1">{fragment.title}</span>
        <span className="text-sm">Fragment Preview</span>
      </div>
      <div className="flex items-center justify-center">
        <ChevronRightIcon className="size-4" />
      </div>
    </button>
  );
};
