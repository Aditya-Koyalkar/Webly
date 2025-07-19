import { inngest } from "./client";
import { Sandbox } from "@e2b/code-interpreter";
import { getSandbox } from "./utils";

export const sandBoxTest = inngest.createFunction(
  {
    id: "sandbox-test",
  },
  {
    event: "test/sandbox",
  },
  async ({ event, step }) => {
    const sandboxId = await step.run("get-sandbox-id", async () => {
      const sandbox = await Sandbox.create("webly-nextjs-test2");
      return sandbox.sandboxId;
    });

    const sandboxUrl = await step.run("get-sandbox-url", async () => {
      const sandbox = await getSandbox(sandboxId);
      const host = sandbox.getHost(3000);
      return `https://${host}`;
    });
    return { sandboxUrl };
  }
);
