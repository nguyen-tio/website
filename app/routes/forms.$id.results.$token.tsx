import { Link, useLoaderData } from 'react-router'
import { Form } from '~/models/.server/form'
import { Submission } from '~/models/.server/submission'
import type { LoaderFunctionArgs } from 'react-router'

export async function loader({ request, params }: LoaderFunctionArgs) {
  const form = Form.findBy('token', params.token as string)
  if (!form || form.id !== Number(params.id)) {
    return { error: 'Invalid or missing token — you may not view these results.' }
  }

  const rawSubmissions = Submission.findAllBy('form_id', form.id)
  const submissions = rawSubmissions.map((s) => {
    let data: Record<string, string> = {}
    try { data = JSON.parse(s.data_json) } catch { /* empty */ }
    return { id: s.id, data, created_at: s.created_at }
  })

  let fields: { label: string; type: string }[]
  try { fields = JSON.parse(form.fields_json) } catch { fields = [] }

  const origin = new URL(request.url).origin
  const formUrl = `${origin}/forms/${form.id}`

  return { form, fields, submissions, formUrl }
}

export default function Page() {
  const result = useLoaderData<typeof loader>()

  if ('error' in result) {
    return (
      <main className="max-w-2xl mx-auto px-6 py-16">
        <div className="alert alert-error">
          <span>{result.error}</span>
        </div>
      </main>
    )
  }

  const { form, fields, submissions, formUrl } = result

  return (
    <>
      <title>{form.title} — Results</title>
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        <div>
          <h1 className="text-3xl font-bold mb-2">{form.title}</h1>
          <p className="text-base-content/60 text-sm">
            Share this form:{' '}
            <Link to={`/forms/${form.id}`} className="link link-primary">
              {formUrl}
            </Link>
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            {submissions.length === 0
              ? 'No submissions yet'
              : `${submissions.length} submission${submissions.length === 1 ? '' : 's'}`}
          </h2>

          {submissions.length > 0 && (
            <div className="space-y-4">
              {submissions.map((sub) => (
                <div key={sub.id} className="card bg-base-200 p-5">
                  <dl className="space-y-2">
                    {fields.map((field) => (
                      <div key={field.label} className="grid grid-cols-3 gap-2">
                        <dt className="font-medium text-sm col-span-1">{field.label}</dt>
                        <dd className="text-sm col-span-2 break-words">
                          {sub.data[field.label] || '—'}
                        </dd>
                      </div>
                    ))}
                  </dl>
                  <p className="text-xs text-base-content/40 mt-3">
                    {sub.created_at
                      ? new Date(sub.created_at).toLocaleString()
                      : ''}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </>
  )
}
