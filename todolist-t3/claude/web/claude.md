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

## actons

### getTodos
GET: todo全て取得
type Todos

#### エラー時
### getTodo
GET: 個別todoを取得
type Todo

#### エラー時
### createTodo
POST: todoを作成
type TodoForm
#### エラー時
### updateTodo
PUT: todoを更新
#### エラー時
### deleteTodo
DELETE: todoを削除
#### エラー時
### doneTodo
PUT: todoを完了
#### エラー時
## ページ設計

todos/ => todo全表示, SSR, todolist を全表示
todos/[id] => todo個別表示, SSR, todoを表示
todos/[id]/edit => todo編集, SSR, todoを編集

### ルートページ

/ => ホーム, SSG, このプロジェクトの説明を表示

### todos/

SSR,
GET,
全てのtodoを取得,
fetch を使用しfastify へリクエスト => api/todos

スケルトンつけたい　=> react-loading-skeleton

```tsx
//todos = type Todos ={todos:todo[];}
const todos = fetch('api/todos');

return{(
  <div>
    <TodoNew />
    {todos.length? todos.map((todo) => (
       <Todo key={todo.id} todo={todo} />
    : <div>Todoがありません</div>
    }
  </div>

)}
```

### todos/[id]
SSR
fetch を使用して個別Todoを取得
PUT, todoを完了 | 削除, server actions を使用し，fastify へリクエスト => api/todos/[id]/done | api/todos/[id]/deletes

```tsx
export const Todo = (id: number) => {
  const todo = await getTodo(id);
  return{(
    <h1>{todo.title}</h1>
    <p>{todo.description}</p>
    <p>{todo.isDone ? '完了' : '未完了'}</p>
    <p>{todo.createdAt}</p>
    <p>{todo.updatedAt}</p>
    <button><Link href={`/todos/${todo.id}/edit`}>編集</Link></button>
    <button onClick={() => deleteTodo(todo.id)}>削除</button>
    <button onClick={() => doneTodo(todo.id)}>完了</button>
  )}
}

```


### todos/[id]/edit
SSRでTodo Fetch => form>use client>, todos からのprops params:id
PUT, todoを更新, server actions を使用し，fastify へリクエスト => api/todos/[id]/edit {id, title, description, isDone}
```tsx
export const TodoEdit = (id: number) => {
  const todo = await getTodo(id);
  return{(
    <TodoEditForm todo={todo} />
  )}
}
```

### todos/new

SSR => use client,
POST, todoを作成, server actions を使用fastify へリクエスト => api/todos/new

```tsx
export const TodoNew = () => {
  return{(
    <TodoNewForm />
  )}
}
```

### コンポーネント構成
