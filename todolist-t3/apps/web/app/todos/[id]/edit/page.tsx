import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTodo } from '@/app/actions/todo';
import { TodoEditForm } from '@/components/todo-edit-form';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function TodoEditPage({
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
          <Link href={`/todos/${todo.id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            詳細に戻る
          </Link>
        </Button>
      </div>

      <TodoEditForm todo={todo} />
    </div>
  );
}