"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const trpc = useTRPC();
  const [value, setValue] = useState("");
  const aiMutate = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        toast.success("AI has started building the web!!");
      },
      onError: (e) => {
        toast.error("Error" + e.message);
      },
    })
  );
  return (
    <div>
      <Input value={value} onChange={(e) => setValue(e.target.value)} />
      <Button
        onClick={async () => {
          await aiMutate.mutate({
            role: "USER",
            type: "RESULT",
            value: value,
          });
        }}
        disabled={aiMutate.isPending}
      >
        Submit
      </Button>
    </div>
  );
}
