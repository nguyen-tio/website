import type { ZodTypeAny } from 'zod'

export function validate(formData: FormData, schema: ZodTypeAny) {
  const data = Object.fromEntries(formData)
  const result = schema.safeParse(data)
  if (result.success) {
    return { data: result.data as Record<string, any>, errors: null }
  }
  return {
    data: null,
    errors: result.error.flatten().fieldErrors as Record<string, string[]>,
  }
}
