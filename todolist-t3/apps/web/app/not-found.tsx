import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-md">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">404</CardTitle>
          <CardDescription>
            お探しのページが見つかりませんでした
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            指定されたTodoが存在しないか、削除されている可能性があります。
          </p>
          <div className="flex gap-2 justify-center">
              <Link href="/">
                <Home className="mr-2 h-4 w-4" />
                ホーム
              </Link>
              <Link href="/todos">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Todoリスト
              </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}