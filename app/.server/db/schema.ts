import { text, sqliteTable } from 'drizzle-orm/sqlite-core'
import { defaultHex, defaultNow, foreign, id, idx } from './helpers'

export const forms = sqliteTable(
  'forms',
  {
    id: id(),
    public_id: defaultHex(),
    title: text().notNull(),
    token: text().notNull().unique(),
    fields_json: text().notNull(),
    bag: text({ mode: 'json' }).$type<FormBag>(),
    created_at: defaultNow(),
    updated_at: defaultNow(),
  },
  (t) => [idx(t, 'created_at')],
)

export type FormBag = Record<string, never>

export const submissions = sqliteTable(
  'submissions',
  {
    id: id(),
    public_id: defaultHex(),
    form_id: foreign(() => forms),
    data_json: text().notNull(),
    bag: text({ mode: 'json' }).$type<SubmissionBag>(),
    created_at: defaultNow(),
    updated_at: defaultNow(),
  },
  (t) => [idx(t, 'form_id'), idx(t, 'created_at')],
)

export type SubmissionBag = Record<string, never>
