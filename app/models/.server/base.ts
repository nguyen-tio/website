import { eq } from 'drizzle-orm'
import { db } from '~/.server/db/client'

export function createModel(table: any) {
  return {
    findByID(id: number) {
      return db.select().from(table).where(eq(table.id, id)).get() ?? null
    },

    findBy(field: string, value: any) {
      return db.select().from(table).where(eq(table[field], value)).get() ?? null
    },

    findByPublicID(publicId: string) {
      return db.select().from(table).where(eq(table.public_id, publicId)).get() ?? null
    },

    findAll() {
      return db.select().from(table).all()
    },

    findAllBy(field: string, value: any) {
      return db.select().from(table).where(eq(table[field], value)).all()
    },

    create(data: any) {
      return db.insert(table).values(data).returning().get()
    },

    update(id: number, data: any) {
      return db.update(table).set(data).where(eq(table.id, id)).returning().get()
    },

    delete(id: number) {
      return db.delete(table).where(eq(table.id, id)).run()
    },

    count() {
      return db.select().from(table).all().length
    },
  }
}
