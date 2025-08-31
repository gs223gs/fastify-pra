import { cookies } from 'next/headers'

export const example = async () => {
  const cookieStore = await cookies()
  const example = cookieStore.get('example')
  return example
}
