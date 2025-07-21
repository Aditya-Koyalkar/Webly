import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { MessageCard } from "./project-card";

const MessagesContainer = ({ projectId }: { projectId: string }) => {
  const trpc = useTRPC();
  const { data: messages } = useSuspenseQuery(trpc.messages.getMany.queryOptions({ projectId }));
  return (
    <div className="flex flex-col flex-1 min-h-0">
      <div className="flex-1 min-h-0 overflow-y-auto">
        <div className="pt-2 pr-2">
          {messages.map((message) => (
            <MessageCard
              key={message.id}
              content={message.content}
              role={message.role}
              fragment={message.fragment}
              createdAt={message.createdAt}
              isActiveFragment={false}
              onFragmentClick={() => {}}
              type={message.type}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MessagesContainer;
