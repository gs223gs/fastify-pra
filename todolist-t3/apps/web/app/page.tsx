import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">

      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Card>
          <CardHeader>
            <CardTitle>技術スタック</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li>Next.js 15 App Router</li>
              <li>Fastify </li>
              <li>TypeScript </li>
              <li>Turborepo </li>
              <li>Zod </li>
              <li>Tailwind CSS + shadcn/ui</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12">
        <CardHeader>
          <CardTitle>プロジェクト構成</CardTitle>
          <CardDescription>T3 Turboモノレポ構造</CardDescription>
        </CardHeader>
        <CardContent>
          <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
            <code>{`todolist-t3/
├── apps/
│   ├── web/          # Next.js フロントエンド
│   └── api/          # Fastify APIサーバー
├── packages/
│   ├── schema/       # Zodスキーマ定義
│   ├── types/        # 共通型定義
│   ├── ui/           # UIコンポーネント
│   └── eslint-config/# ESLint設定
└── turbo.json        # Turborepo設定`}</code>
          </pre>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href="/todos">Todoリストを開く →</Link>
      </div>
    </div>
  );
}
