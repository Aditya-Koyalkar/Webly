import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const messagesRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "Message is required" }),
        role: z.enum(["ASSISTANT", "USER"]),
        type: z.enum(["ERROR", "RESULT"]),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createdMessage = await prisma.message.create({
        data: {
          content: input.value,
          userId: ctx.auth.user.id,
          role: input.role,
          type: input.type,
        },
      });
      if (input.role === "USER" && input.type === "RESULT") {
        await inngest.send({
          name: "code-agent/run",
          data: {
            value: input.value,
            userId: ctx.auth.user.id,
          },
        });
      }
      return createdMessage;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const messages = await prisma.message.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
      orderBy: {
        createdAt: "asc",
      },
      include: {
        fragment: true,
      },
    });
    return messages;
  }),
});
