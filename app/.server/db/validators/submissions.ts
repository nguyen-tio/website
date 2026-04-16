import { createInsertSchema } from 'drizzle-zod'
import { submissions } from '../schema'

export const submissionInsertSchema = createInsertSchema(submissions, {
  data_json: (s) => s.min(1, 'Submission data is required'),
}).pick({ form_id: true, data_json: true })
