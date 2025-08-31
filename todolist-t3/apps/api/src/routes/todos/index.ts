import { FastifyPluginAsync } from 'fastify'
import { z } from 'zod'

// バリデーションスキーマ
const TodoSchema = z.object({
  title: z.string().min(1, 'タイトルは必須です'),
  description: z.string().optional(),
  isDone: z.boolean().default(false)
})

const TodoIdSchema = z.object({
  id: z.string().min(1, 'IDは必須です')
})

// エラーレスポンス型
type ErrorResponse = {
  error: string;
  message: string;
  statusCode: number;
}

// 簡単なインメモリストレージ（実際のプロジェクトではDBを使用）
let todos: any[] = []

const todos: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  // GET /api/todos - 全Todo取得
  fastify.get('/', async function (request, reply) {
    try {
      return { todos }
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'Internal Server Error',
        message: 'Todoの取得に失敗しました',
        statusCode: 500
      }
      return reply.status(500).send(errorResponse)
    }
  })

  // POST /api/todos/new - Todo作成
  fastify.post('/new', async function (request, reply) {
    try {
      const body = request.body as any
      
      // バリデーション
      const validationResult = TodoSchema.safeParse(body)
      if (!validationResult.success) {
        const errorResponse: ErrorResponse = {
          error: 'Bad Request',
          message: validationResult.error.errors[0]?.message || 'バリデーションエラー',
          statusCode: 400
        }
        return reply.status(400).send(errorResponse)
      }

      const newTodo = {
        id: Date.now().toString(),
        ...validationResult.data,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      todos.push(newTodo)
      return reply.status(201).send(newTodo)
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'Internal Server Error',
        message: 'Todoの作成に失敗しました',
        statusCode: 500
      }
      return reply.status(500).send(errorResponse)
    }
  })

  // GET /api/todos/:id - 個別Todo取得
  fastify.get('/:id', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      // バリデーション
      const validationResult = TodoIdSchema.safeParse({ id })
      if (!validationResult.success) {
        const errorResponse: ErrorResponse = {
          error: 'Bad Request',
          message: '無効なIDです',
          statusCode: 400
        }
        return reply.status(400).send(errorResponse)
      }

      const todo = todos.find(t => t.id === id)
      if (!todo) {
        const errorResponse: ErrorResponse = {
          error: 'Not Found',
          message: '指定されたTodoが見つかりません',
          statusCode: 404
        }
        return reply.status(404).send(errorResponse)
      }

      return todo
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'Internal Server Error',
        message: 'Todoの取得に失敗しました',
        statusCode: 500
      }
      return reply.status(500).send(errorResponse)
    }
  })

  // PUT /api/todos/:id/edit - Todo更新
  fastify.put('/:id/edit', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      const body = request.body as any
      
      // バリデーション
      const idValidation = TodoIdSchema.safeParse({ id })
      if (!idValidation.success) {
        const errorResponse: ErrorResponse = {
          error: 'Bad Request',
          message: '無効なIDです',
          statusCode: 400
        }
        return reply.status(400).send(errorResponse)
      }

      const bodyValidation = TodoSchema.safeParse(body)
      if (!bodyValidation.success) {
        const errorResponse: ErrorResponse = {
          error: 'Bad Request',
          message: bodyValidation.error.errors[0]?.message || 'バリデーションエラー',
          statusCode: 400
        }
        return reply.status(400).send(errorResponse)
      }

      const todoIndex = todos.findIndex(t => t.id === id)
      if (todoIndex === -1) {
        const errorResponse: ErrorResponse = {
          error: 'Not Found',
          message: '指定されたTodoが見つかりません',
          statusCode: 404
        }
        return reply.status(404).send(errorResponse)
      }

      todos[todoIndex] = {
        ...todos[todoIndex],
        ...bodyValidation.data,
        updatedAt: new Date().toISOString()
      }

      return todos[todoIndex]
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'Internal Server Error',
        message: 'Todoの更新に失敗しました',
        statusCode: 500
      }
      return reply.status(500).send(errorResponse)
    }
  })

  // PATCH /api/todos/:id/done - Todo完了
  fastify.patch('/:id/done', async function (request, reply) {
    try {
      const { id } = request.params as { id: string }
      
      // バリデーション
      const validationResult = TodoIdSchema.safeParse({ id })
      if (!validationResult.success) {
        const errorResponse: ErrorResponse = {
          error: 'Bad Request',
          message: '無効なIDです',
          statusCode: 400
        }
        return reply.status(400).send(errorResponse)
      }

      const todoIndex = todos.findIndex(t => t.id === id)
      if (todoIndex === -1) {
        const errorResponse: ErrorResponse = {
          error: 'Not Found',
          message: '指定されたTodoが見つかりません',
          statusCode: 404
        }
        return reply.status(404).send(errorResponse)
      }

      todos[todoIndex] = {
        ...todos[todoIndex],
        isDone: !todos[todoIndex].isDone,
        updatedAt: new Date().toISOString()
      }

      return todos[todoIndex]
    } catch (error) {
      const errorResponse: ErrorResponse = {
        error: 'Internal Server Error',
        message: 'Todoの状態更新に失敗しました',
        statusCode: 500
      }
      return reply.status(500).send(errorResponse)
    }
  })
}

export default todos
