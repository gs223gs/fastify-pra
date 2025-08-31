# next.js を用いた todoサイトのフロント開発

認証なしTodoサイトのフロント

# アーキテクチャ関係

T3-Turbo/web

Next.js 15.4
App Router
shadcn, tailwind
コンポーネントはpackages/uiにまとめられています．

# 設計

## type 設計

このプロジェクトはT3-turboでモノレポで管理されています．
共通の型は `packages/types` にまとめられています．

### 共通の型

```ts
type Todo = {
  id: TodoId;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: string;
  updatedAt: string;
};

type Todos = {
  todos: todo[];
};

type TodoForm = {
  id: TodoId;
  title: string;
  description: string;
  isDone: boolean;
};

type TodoId = {
  id: string;
}
```
## API

### api/todos/new
POST: todoを作成
type TodoForm

#### エラー時


### api/todos/
GET: todo全て取得
type Todos

#### エラー時


### api/todos/[id]
GET: 個別todoを取得
type Todo

#### エラー時


### api/todos/[id]/edit
PUT: todoを更新
type TodoForm

#### エラー時


### api/todos/[id]/done
PATCH: todoを完了
type todoId

#### エラー時

