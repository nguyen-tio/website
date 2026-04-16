import { PlusIcon, TrashIcon } from 'lucide-react'
import { useState } from 'react'
import { Form as RouterForm, redirect, useActionData } from 'react-router'
import { validate } from '~/lib/data/validate'
import { Form } from '~/models/.server/form'
import { formInsertSchema } from '~/.server/db/validators'
import type { ActionFunctionArgs } from 'react-router'

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const { data, errors } = validate(formData, formInsertSchema)
  if (errors) return { errors }

  const token = Array.from(
    crypto.getRandomValues(new Uint8Array(20)),
    (b) => b.toString(16).padStart(2, '0'),
  ).join('')

  const form = Form.create({ ...data, token })
  return redirect(`/forms/${form.id}/results/${form.token}`)
}

type FieldDraft = { label: string; type: 'text' | 'email' | 'textarea' }

export default function Page() {
  const result = useActionData<typeof action>()
  const errors = result?.errors
  const [fields, setFields] = useState<FieldDraft[]>([{ label: '', type: 'text' }])

  function addField() {
    setFields((prev) => [...prev, { label: '', type: 'text' }])
  }

  function removeField(i: number) {
    setFields((prev) => prev.filter((_, idx) => idx !== i))
  }

  function updateField(i: number, patch: Partial<FieldDraft>) {
    setFields((prev) => prev.map((f, idx) => (idx === i ? { ...f, ...patch } : f)))
  }

  return (
    <>
      <title>New Form</title>
      <main className="max-w-2xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">Create a new form</h1>

        <RouterForm method="post" className="space-y-8">
          {/* Title */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Form title</span>
            </label>
            <input
              name="title"
              type="text"
              placeholder="e.g. Contact form"
              className="input input-bordered w-full"
              required
            />
            {errors?.title && (
              <p className="text-error text-sm mt-1">{errors.title[0]}</p>
            )}
          </div>

          {/* Fields */}
          <div>
            <p className="label-text font-medium mb-3">Fields</p>
            <div className="space-y-3">
              {fields.map((field, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <input
                    type="text"
                    placeholder="Label"
                    value={field.label}
                    onChange={(e) => updateField(i, { label: e.target.value })}
                    className="input input-bordered flex-1"
                  />
                  <select
                    value={field.type}
                    onChange={(e) =>
                      updateField(i, { type: e.target.value as FieldDraft['type'] })
                    }
                    className="select select-bordered"
                  >
                    <option value="text">Text</option>
                    <option value="email">Email</option>
                    <option value="textarea">Textarea</option>
                  </select>
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeField(i)}
                      className="btn btn-ghost btn-square"
                      aria-label="Remove field"
                    >
                      <TrashIcon size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            {errors?.fields_json && (
              <p className="text-error text-sm mt-2">{errors.fields_json[0]}</p>
            )}
            <button
              type="button"
              onClick={addField}
              className="btn btn-ghost btn-sm mt-3 gap-1"
            >
              <PlusIcon size={14} /> Add field
            </button>
          </div>

          {/* Serialize fields into a hidden input */}
          <input
            type="hidden"
            name="fields_json"
            value={JSON.stringify(fields)}
          />

          <button type="submit" className="btn btn-primary w-full">
            Save form
          </button>
        </RouterForm>
      </main>
    </>
  )
}
