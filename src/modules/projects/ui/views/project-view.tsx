"use client";

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

interface Props {
  projectId: string;
}

export const ProjectView = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const { data: project } = useSuspenseQuery(trpc.projects.getOne.queryOptions({ projectId }));
  const { data: messages } = useSuspenseQuery(trpc.messages.getMany.queryOptions({ projectId }));
  return (
    <div>
      {JSON.stringify(project)}
      {JSON.stringify(messages)}
    </div>
  );
};
