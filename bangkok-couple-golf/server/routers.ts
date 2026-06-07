import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  community: router({
    posts: router({
      list: publicProcedure
        .input(z.object({ limit: z.number().default(20), offset: z.number().default(0) }))
        .query(async ({ input }) => {
          return await db.getPosts(input.limit, input.offset);
        }),
      
      getById: publicProcedure
        .input(z.object({ postId: z.number() }))
        .query(async ({ input }) => {
          await db.incrementPostViewCount(input.postId);
          return await db.getPostById(input.postId);
        }),
      
      create: protectedProcedure
        .input(z.object({
          title: z.string().min(1).max(255),
          content: z.string().min(1),
          category: z.string().default("general"),
        }))
        .mutation(async ({ input, ctx }) => {
          return await db.createPost({
            userId: ctx.user.id,
            title: input.title,
            content: input.content,
            category: input.category,
          });
        }),
      
      update: protectedProcedure
        .input(z.object({
          postId: z.number(),
          title: z.string().min(1).max(255).optional(),
          content: z.string().min(1).optional(),
          category: z.string().optional(),
        }))
        .mutation(async ({ input, ctx }) => {
          const post = await db.getPostById(input.postId);
          if (!post || post.userId !== ctx.user.id) {
            throw new Error("Unauthorized");
          }
          return await db.updatePost(input.postId, {
            title: input.title,
            content: input.content,
            category: input.category,
          });
        }),
      
      delete: protectedProcedure
        .input(z.object({ postId: z.number() }))
        .mutation(async ({ input, ctx }) => {
          const post = await db.getPostById(input.postId);
          if (!post || post.userId !== ctx.user.id) {
            throw new Error("Unauthorized");
          }
          return await db.deletePost(input.postId);
        }),
    }),
    
    comments: router({
      getByPostId: publicProcedure
        .input(z.object({ postId: z.number() }))
        .query(async ({ input }) => {
          return await db.getCommentsByPostId(input.postId);
        }),
      
      create: protectedProcedure
        .input(z.object({
          postId: z.number(),
          content: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
          return await db.createComment({
            postId: input.postId,
            userId: ctx.user.id,
            content: input.content,
          });
        }),
      
      delete: protectedProcedure
        .input(z.object({ commentId: z.number() }))
        .mutation(async ({ input, ctx }) => {
          return await db.deleteComment(input.commentId);
        }),
    }),
  }),
});

export type AppRouter = typeof appRouter;
