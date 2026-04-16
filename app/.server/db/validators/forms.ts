import { createInsertSchema } from 'drizzle-zod'
import { forms } from '../schema'

export const formInsertSchema = createInsertSchema(forms, {
  title: (s) => s.trim().min(1, 'Title is required'),
  fields_json: (s) =>
    s.refine(
      (v) => {
        try {
          const arr = JSON.parse(v)
          return (
            Array.isArray(arr) &&
            arr.length > 0 &&
            arr.every(
              (f: any) =>
                typeof f.label === 'string' &&
                f.label.trim().length > 0 &&
                ['text', 'email', 'textarea'].includes(f.type),
            )
          )
        } catch {
          return false
        }
      },
      { message: 'At least one valid field is required' },
    ),
}).pick({ title: true, fields_json: true })
