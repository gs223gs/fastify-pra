import type { Todo, TodoList } from '@repo/schema/types';

// モックデータ
export const mockTodos: Todo[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440001',
    title: 'Next.jsの学習',
    description: 'App RouterとServer Componentsを理解する',
    isDone: false,
    createdAt: '2024-01-01T10:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440002',
    title: 'Todoアプリの実装',
    description: 'フルスタックTodoアプリケーションを作成',
    isDone: false,
    createdAt: '2024-01-02T10:00:00.000Z',
    updatedAt: '2024-01-02T10:00:00.000Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440003',
    title: 'TypeScriptのセットアップ',
    description: '',
    isDone: true,
    createdAt: '2024-01-03T10:00:00.000Z',
    updatedAt: '2024-01-03T15:00:00.000Z'
  },
  {
    id: '550e8400-e29b-41d4-a716-446655440004',
    title: 'テストを書く',
    description: 'JestとReact Testing Libraryでテストを実装',
    isDone: false,
    createdAt: '2024-01-04T10:00:00.000Z',
    updatedAt: '2024-01-04T10:00:00.000Z'
  }
];

// APIレスポンスのシミュレーション用の遅延
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// モックデータストア（実際のDBの代わり）
let todosStore = [...mockTodos];