import { z } from 'zod';

// ========================================
// Base Schemas
// ========================================

export const TodoSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(100),
  description: z.string().default(''),
  isDone: z.boolean().default(false),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
});

export const TodoFormSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です').max(100, 'タイトルは100文字以内で入力してください'),
  description: z.string().max(500, '説明は500文字以内で入力してください').optional(),
  isDone: z.boolean().default(false)
});

// ========================================
// Common Schemas
// ========================================

export const IdParamsSchema = z.object({
  id: z.string().uuid()
});

export const TodoListSchema = z.array(TodoSchema);

export const CreateTodoSchema = TodoFormSchema;

export const UpdateTodoSchema = TodoFormSchema.partial();

export const SuccessResponseSchema = z.object({
  success: z.boolean(),
  message: z.string()
});

export const ErrorResponseSchema = z.object({
  error: z.string(),
  message: z.string(),
  statusCode: z.number()
});

// ========================================
// Export types
// ========================================

export * from './types';