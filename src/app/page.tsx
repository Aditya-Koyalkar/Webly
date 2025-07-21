"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTRPC } from "@/trpc/client";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function Home() {
  const router = useRouter();
  const trpc = useTRPC();
  const [value, setValue] = useState("");
  const createProject = useMutation(
    trpc.projects.create.mutationOptions({
      onSuccess: (data) => {
        router.push(`/projects/${data.id}`);
      },
      onError: (e) => {
        toast.error("Error" + e.message);
      },
    })
  );
  return (
    <div className="h-screen w-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex items-center flex-col gap-y-4">
        <Input value={value} onChange={(e) => setValue(e.target.value)} />
        <Button
          onClick={() => {
            createProject.mutate({
              value: value,
            });
          }}
          disabled={createProject.isPending}
        >
          {createProject.isPending ? "Submitting" : "Submit"} {createProject.isPending && <Loader2 className="w-5 animate-spin" />}
        </Button>
      </div>
    </div>
  );
}
