import { inngest } from "@/inngest/client";
import { prisma } from "@/lib/db";
import { createTRPCRouter, protectedProcedure } from "@/trpc/init";
import z from "zod";

export const projectsRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        value: z.string().min(1, { message: "Value is required" }).max(10000, { message: "Value is too long.." }),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const createdProject = await prisma.project.create({
        data: {
          name: input.value,
          userId: ctx.auth.user.id,
          messages: {
            create: {
              content: input.value,
              role: "USER",
              type: "RESULT",
            },
          },
        },
      });

      await inngest.send({
        name: "code-agent/run",
        data: {
          value: input.value,
          projectId: createdProject.id,
        },
      });

      return createdProject;
    }),
  getMany: protectedProcedure.query(async ({ ctx }) => {
    const messages = await prisma.project.findMany({
      where: {
        userId: ctx.auth.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return messages;
  }),
});
