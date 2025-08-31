export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export type CreateTodoInput = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;
export type UpdateTodoInput = Partial<Omit<Todo, 'id' | 'createdAt' | 'updatedAt'>>;