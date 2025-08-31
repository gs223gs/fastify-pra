'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import type { Todo } from '@repo/schema/types';
import { TodoFormSchema, UpdateTodoSchema } from '@repo/schema';
import { mockTodos, delay } from '@/lib/mock-data';

// モックデータストア
let todosStore = [...mockTodos];

// ========================================
// GET Actions (Fetch)
// ========================================

export async function getTodos(): Promise<Todo[]> {
  await delay(500); // APIの遅延をシミュレート
  
  // TODO: 実際のAPI呼び出しに置き換える
  // const response = await fetch('http://localhost:3001/api/todos');
  // if (!response.ok) throw new Error('Failed to fetch todos');
  // return response.json();
  
  // モックデータを返す
  return todosStore;
}

export async function getTodo(id: string): Promise<Todo | null> {
  await delay(300);
  
  // TODO: 実際のAPI呼び出しに置き換える
  // const response = await fetch(`http://localhost:3001/api/todos/${id}`);
  // if (!response.ok) return null;
  // return response.json();
  
  // モックデータから検索
  const todo = todosStore.find(t => t.id === id);
  return todo || null;
}

// ========================================
// POST Actions
// ========================================

export async function createTodo(formData: FormData) {
  try {
    // バリデーション
    const validatedData = TodoFormSchema.parse({
      title: formData.get('title'),
      description: formData.get('description') || '',
      isDone: false
    });

    await delay(500);

    // TODO: 実際のAPI呼び出しに置き換える
    // const response = await fetch('http://localhost:3001/api/todos', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData)
    // });
    // if (!response.ok) throw new Error('Failed to create todo');

    // モックデータに追加
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title: validatedData.title,
      description: validatedData.description || '',
      isDone: validatedData.isDone,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    todosStore.push(newTodo);

    revalidatePath('/todos');
    redirect('/todos');
  } catch (error) {
    console.error('Failed to create todo:', error);
    throw new Error('Todoの作成に失敗しました');
  }
}

// ========================================
// PUT Actions
// ========================================

export async function updateTodo(id: string, formData: FormData) {
  try {
    // バリデーション
    const validatedData = UpdateTodoSchema.parse({
      title: formData.get('title'),
      description: formData.get('description'),
      isDone: formData.get('isDone') === 'true'
    });

    await delay(500);

    // TODO: 実際のAPI呼び出しに置き換える
    // const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(validatedData)
    // });
    // if (!response.ok) throw new Error('Failed to update todo');

    // モックデータを更新
    const index = todosStore.findIndex(t => t.id === id);
    if (index !== -1) {
      todosStore[index] = {
        ...todosStore[index],
        ...validatedData,
        updatedAt: new Date().toISOString()
      };
    }

    revalidatePath('/todos');
    revalidatePath(`/todos/${id}`);
    redirect(`/todos/${id}`);
  } catch (error) {
    console.error('Failed to update todo:', error);
    throw new Error('Todoの更新に失敗しました');
  }
}

export async function doneTodo(id: string) {
  try {
    await delay(300);

    // TODO: 実際のAPI呼び出しに置き換える
    // const response = await fetch(`http://localhost:3001/api/todos/${id}/done`, {
    //   method: 'PUT'
    // });
    // if (!response.ok) throw new Error('Failed to complete todo');

    // モックデータを更新
    const index = todosStore.findIndex(t => t.id === id);
    if (index !== -1) {
      todosStore[index] = {
        ...todosStore[index],
        isDone: !todosStore[index].isDone,
        updatedAt: new Date().toISOString()
      };
    }

    revalidatePath('/todos');
    revalidatePath(`/todos/${id}`);
  } catch (error) {
    console.error('Failed to complete todo:', error);
    throw new Error('Todoの完了状態の更新に失敗しました');
  }
}

// ========================================
// DELETE Actions
// ========================================

export async function deleteTodo(id: string) {
  try {
    await delay(300);

    // TODO: 実際のAPI呼び出しに置き換える
    // const response = await fetch(`http://localhost:3001/api/todos/${id}`, {
    //   method: 'DELETE'
    // });
    // if (!response.ok) throw new Error('Failed to delete todo');

    // モックデータから削除
    todosStore = todosStore.filter(t => t.id !== id);

    revalidatePath('/todos');
    redirect('/todos');
  } catch (error) {
    console.error('Failed to delete todo:', error);
    throw new Error('Todoの削除に失敗しました');
  }
}