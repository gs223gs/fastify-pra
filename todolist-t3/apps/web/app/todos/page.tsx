import { Suspense } from 'react';
import { getTodos } from '@/app/actions/todo';
import { TodoNewForm } from '@/components/todo-new-form';
import { TodoCard } from '@/components/todo-card';
import { TodoListSkeleton, TodoFormSkeleton } from '@/components/todo-skeleton';

async function TodoList() {
  const todos = await getTodos();

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          Todoがありません
        </p>
        <p className="text-gray-400 dark:text-gray-500 text-sm mt-2">
          新しいTodoを作成
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoCard key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default function TodosPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Todo リスト</h1>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_2fr]">
        <div>
          <Suspense fallback={<TodoFormSkeleton />}>
            <TodoNewForm />
          </Suspense>
        </div>
        
        <div>
          <Suspense fallback={<TodoListSkeleton />}>
            <TodoList />
          </Suspense>
        </div>
      </div>
    </div>
  );
}