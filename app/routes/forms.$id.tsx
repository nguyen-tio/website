import { Form as RouterForm, redirect, useActionData, useLoaderData } from 'react-router'
import { Form } from '~/models/.server/form'
import { Submission } from '~/models/.server/submission'
import type { ActionFunctionArgs, LoaderFunctionArgs } from 'react-router'

export async function loader({ params }: LoaderFunctionArgs) {
  const form = Form.findByID(Number(params.id))
  if (!form) throw new Response('Not found', { status: 404 })
  let fields: FormField[]
  try {
    fields = JSON.parse(form.fields_json)
  } catch {
    fields = []
  }
  return { form, fields }
}

export async function action({ params, request }: ActionFunctionArgs) {
  const form = Form.findByID(Number(params.id))
  if (!form) throw new Response('Not found', { status: 404 })

  const formData = await request.formData()
  let fields: FormField[]
  try {
    fields = JSON.parse(form.fields_json)
  } catch {
    fields = []
  }

  const answers: Record<string, string> = {}
  fields.forEach((field, i) => {
    answers[field.label] = String(formData.get(`field_${i}`) ?? '')
  })

  Submission.create({ form_id: form.id, data_json: JSON.stringify(answers) })
  return redirect(`/forms/${form.id}?submitted=1`)
}

export default function Page() {
  const { form, fields } = useLoaderData<typeof loader>()
  const [params] = [new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '')]
  const submitted = params.get('submitted') === '1'

  return (
    <>
      <title>{form.title}</title>
      <main className="max-w-2xl mx-auto px-6 py-16">
        {submitted ? (
          <div className="alert alert-success">
            <span>Your response has been submitted. Thank you!</span>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-bold mb-8">{form.title}</h1>
            <RouterForm method="post" className="space-y-6">
              {fields.map((field, i) => (
                <div key={i} className="form-control">
                  <label className="label">
                    <span className="label-text font-medium">{field.label}</span>
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      name={`field_${i}`}
                      className="textarea textarea-bordered w-full"
                      rows={4}
                      required
                    />
                  ) : (
                    <input
                      name={`field_${i}`}
                      type={field.type}
                      className="input input-bordered w-full"
                      required
                    />
                  )}
                </div>
              ))}
              <button type="submit" className="btn btn-primary w-full">
                Submit
              </button>
            </RouterForm>
          </>
        )}
      </main>
    </>
  )
}

type FormField = { label: string; type: 'text' | 'email' | 'textarea' }
