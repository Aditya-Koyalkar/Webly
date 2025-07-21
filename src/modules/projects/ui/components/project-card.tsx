import { Card } from "@/components/ui/card";
import { Fragment, MessageRole, MessageType } from "@/generated/prisma";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
    <div className={cn("flex flex-col px-2 pb-6", type == "ERROR" && "text-red-700 dark:text-red-500")}>
      <div className="flex items-center gap-2 ">
        <span className="text-sm font-medium">Webly</span>
        <span className="text-sm text-muted-foreground opacity-0 transition-opacity">{format(createdAt, "HH:mm 'on' MMM dd, yyyy")}</span>
      </div>
      <div className="pl-8 flex flex-col gap-y-5">
        <span>{content}</span>
      </div>
    </div>
  );
};
