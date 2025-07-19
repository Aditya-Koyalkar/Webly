import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import z from "zod";

export const messagesRouter = createTRPCRouter({
  create: baseProcedure.input(z.object({})).mutation(({ ctx, input }) => {}),
});
