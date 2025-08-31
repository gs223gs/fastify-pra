import { z } from 'zod';
import {
  TodoSchema,
  TodoFormSchema,
  CreateTodoSchema,
  UpdateTodoSchema,
  IdParamsSchema,
  TodoListSchema,
  SuccessResponseSchema,
  ErrorResponseSchema
} from './index';

// ========================================
// Type Inference from Schemas
// ========================================

// Base Types
export type Todo = z.infer<typeof TodoSchema>;
export type TodoForm = z.infer<typeof TodoFormSchema>;
export type CreateTodo = z.infer<typeof CreateTodoSchema>;
export type UpdateTodo = z.infer<typeof UpdateTodoSchema>;

// Common Types
export type IdParams = z.infer<typeof IdParamsSchema>;
export type TodoList = z.infer<typeof TodoListSchema>;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

// Helper Types
export type TodoId = Todo['id'];