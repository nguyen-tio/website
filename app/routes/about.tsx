export default function Page() {
  return (
    <>
      <title>About Alex — Freelance Photographer</title>
      <meta name="description" content="Alex is a freelance photographer based in Portland, Oregon, specialising in landscapes, portraits, and street photography." />
      <main className="max-w-5xl mx-auto px-6 py-16 sm:py-24">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-6">About Alex</h1>
        <p className="text-lg text-base-content/70 max-w-2xl mb-16">
          Freelance photographer based in Portland, Oregon, with a passion for
          landscapes and street photography. I shoot with natural light whenever possible
          and believe the best photos tell stories without words.
        </p>

        <h2 className="text-2xl font-bold tracking-tight mb-6">Get in touch</h2>
        <form className="flex flex-col gap-4 max-w-lg">
          <label className="form-control">
            <div className="label"><span className="label-text">Name</span></div>
            <input type="text" name="name" placeholder="Your name" className="input input-bordered w-full" required />
          </label>
          <label className="form-control">
            <div className="label"><span className="label-text">Email</span></div>
            <input type="email" name="email" placeholder="you@example.com" className="input input-bordered w-full" required />
          </label>
          <label className="form-control">
            <div className="label"><span className="label-text">Message</span></div>
            <textarea name="message" placeholder="What's on your mind?" rows={5} className="textarea textarea-bordered w-full" required />
          </label>
          <button type="submit" className="btn btn-primary self-start px-8">Send message</button>
        </form>
      </main>
    </>
  )
}
