import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTodo, doneTodo, deleteTodo } from '@/app/actions/todo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Edit, Trash2, CheckCircle, Circle, Calendar, Clock } from 'lucide-react';

export default async function TodoDetailPage({
  params
}: {
  params: { id: string }
}) {
  const todo = await getTodo(params.id);

  if (!todo) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <div className="mb-6">
        <Button variant="ghost" asChild>
          <Link href="/todos">
            <ArrowLeft className="mr-2 h-4 w-4" />
            戻る
          </Link>
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-2xl mb-2">
                {todo.title}
              </CardTitle>
              <div className="flex items-center gap-2">
                  {todo.isDone ? (
                    <>
                      <CheckCircle className="mr-1 h-3 w-3" />
                      完了
                    </>
                  ) : (
                    <>
                      <Circle className="mr-1 h-3 w-3" />
                      未完了
                    </>
                  )}
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" asChild>
                <Link href={`/todos/${todo.id}/edit`}>
                  <Edit className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {todo.description && (
            <div>
              <h3 className="font-semibold mb-2">説明</h3>
              <p className="text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
                {todo.description}
              </p>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Calendar className="mr-2 h-4 w-4" />
              <div>
                <p className="font-medium">作成日</p>
                <p>{new Date(todo.createdAt).toLocaleString('ja-JP')}</p>
              </div>
            </div>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <Clock className="mr-2 h-4 w-4" />
              <div>
                <p className="font-medium">更新日</p>
                <p>{new Date(todo.updatedAt).toLocaleString('ja-JP')}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <form action={doneTodo.bind(null, todo.id)}>
              <Button type="submit" variant={todo.isDone ? "outline" : "default"}>
                {todo.isDone ? '未完了にする' : '完了にする'}
              </Button>
            </form>
            
            <form action={deleteTodo.bind(null, todo.id)}>
              <Button type="submit" variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                削除
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}