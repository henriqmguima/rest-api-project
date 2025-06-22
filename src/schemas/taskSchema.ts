import { z } from 'zod';

export const createTaskSchema = z.object({
  title: z.string().min(3),
  content: z.string().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(3).optional(),
  content: z.string().optional(),
  done: z.boolean().optional(),
});
