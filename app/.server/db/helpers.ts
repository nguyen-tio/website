import { index, integer, text, uniqueIndex } from 'drizzle-orm/sqlite-core'

export const id = () => integer().primaryKey({ autoIncrement: true })

export function defaultHex(length = 12) {
  return text()
    .notNull()
    .unique()
    .$defaultFn(() => {
      const bytes = crypto.getRandomValues(new Uint8Array(Math.ceil(length / 2)))
      return Array.from(bytes)
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('')
        .slice(0, length)
    })
}

export const defaultNow = () =>
  integer({ mode: 'timestamp' })
    .notNull()
    .$defaultFn(() => new Date())

export const timestamp = () => integer({ mode: 'timestamp' })

export function foreign(ref: () => any) {
  return integer()
    .notNull()
    .references(() => ref().id, { onDelete: 'cascade' })
}

export const idx = (t: any, col: string) => index(`${col}_idx`).on(t[col])

export const unq = (t: any, col: string) => uniqueIndex(`${col}_unq`).on(t[col])
