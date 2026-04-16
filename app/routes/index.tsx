import { Link } from 'react-router'

export default function Page() {
  return (
    <>
      <title>Alex — Freelance Photographer</title>
      <meta name="description" content="Freelance photographer based in Portland capturing landscapes, portraits, and street moments." />
      <main>
        <section className="max-w-5xl mx-auto px-6 py-24 sm:py-36 text-center">
          <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-4">Freelance Photographer</p>
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-6">
            Hi, I'm Alex
          </h1>
          <p className="text-lg sm:text-xl text-base-content/70 max-w-xl mx-auto mb-10">
            I capture landscapes, portraits, and street moments — turning fleeting scenes into lasting images.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/projects" className="btn btn-primary px-8">View Projects</Link>
            <Link to="/about" className="btn btn-outline px-8">About Me</Link>
          </div>
        </section>

        <section className="max-w-5xl mx-auto px-6 pb-24 text-center">
          <div className="bg-base-200 rounded-2xl p-10 sm:p-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">Build a form in seconds</h2>
            <p className="text-base-content/70 mb-6 max-w-md mx-auto">
              Create custom forms, share the link, and watch responses roll in.
            </p>
            <Link to="/forms/new" className="btn btn-primary px-10">
              Create a form
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
