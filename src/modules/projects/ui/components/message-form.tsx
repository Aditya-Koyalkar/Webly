import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ArrowUpIcon, Loader2Icon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import TextareAutosize from "react-textarea-autosize";
import { toast } from "sonner";
import z from "zod";

interface Props {
  projectId: string;
}

const formschema = z.object({
  value: z.string().min(1, { message: "Value is required" }).max(10000, { message: "Value too  long" }),
});

export const MessageForm = ({ projectId }: Props) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const form = useForm<z.infer<typeof formschema>>({
    defaultValues: {
      value: "",
    },
    resolver: zodResolver(formschema),
  });
  const createMessage = useMutation(
    trpc.messages.create.mutationOptions({
      onSuccess: () => {
        form.reset();
        queryClient.invalidateQueries(trpc.messages.getMany.queryOptions({ projectId }));
      },
      onError: (e) => {
        toast.error(e.message);
      },
    })
  );
  const onSubmit = async (values: z.infer<typeof formschema>) => {
    await createMessage.mutate({
      projectId,
      value: values.value,
    });
  };

  const [isFocused, setIsFocused] = useState(false);
  const showUsage = false;
  const isDisabled = createMessage.isPending || !form.formState.isValid;

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className={cn(
            "relative border p-4 pt-1 rounded-xl bg-sidebar dark:bg-sidebar transition-all",
            isFocused && "shadow-xs",
            showUsage && "rounded-t-none"
          )}
        >
          <FormField
            name="value"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <TextareAutosize
                    className="pt-4 resize-none border-none w-full outline-none bg-transparent"
                    {...field}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    minRows={2}
                    maxRows={8}
                    placeholder="What would you like to build?"
                    onKeyDown={(e) => {
                      if (e.key == "Enter" && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        form.handleSubmit(onSubmit)(e);
                      }
                    }}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex gap-x-2 items-end justify-between pt-2">
            <div className="text-[10px] text-muted-foreground font-mono">
              <kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium">
                <span>&#8984;</span> Enter
              </kbd>
              &nbsp; to submit
            </div>
            <Button type="submit" disabled={isDisabled} className={cn("size-8 rounded-full", isDisabled && "bg-muted-foreground border")}>
              {createMessage.isPending ? <Loader2Icon className="animate-spin" /> : <ArrowUpIcon />}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};
