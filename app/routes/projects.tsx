import { Mountain, User, Camera } from 'lucide-react'

const projects = [
  {
    icon: Mountain,
    title: 'Landscapes',
    description: 'Mountain and forest photography capturing the raw beauty of the natural world.',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
  },
  {
    icon: User,
    title: 'Portraits',
    description: 'Studio and natural light portraits that reveal character and emotion.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
  },
  {
    icon: Camera,
    title: 'Street Photography',
    description: 'Urban life and candid moments from the streets of Portland and beyond.',
    image: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&q=80',
  },
]

export default function Page() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
      <title>Projects — Alex, Freelance Photographer</title>
      <meta name="description" content="Browse Alex's photography projects: landscapes, portraits, and street photography from Portland and beyond." />
      <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-12">Projects</h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(({ icon: Icon, title, description, image }) => (
          <div key={title} className="card bg-base-200 overflow-hidden">
            <figure>
              <img src={image} alt={title} className="w-full h-52 object-cover" />
            </figure>
            <div className="card-body gap-2">
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-primary shrink-0" />
                <h2 className="card-title text-base">{title}</h2>
              </div>
              <p className="text-sm text-base-content/60">{description}</p>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
