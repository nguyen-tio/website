import { Link, Links, Outlet, Scripts, ScrollRestoration } from 'react-router'
import './tailwind.css'

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="dim">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Alex — Freelance Photographer</title>
        <link rel="icon" href="/favicon.svg" sizes="any" type="image/svg+xml" />
        <Links />
      </head>
      <body className="flex flex-col min-h-screen">
        <header className="border-b border-base-300">
          <nav className="max-w-5xl mx-auto flex items-center gap-6 px-6 py-4">
           <Link to="/" className="text-sm font-medium hover:text-primary transition-colors">Home</Link>
           <Link to="/projects" className="text-sm font-medium hover:text-primary transition-colors">Projects</Link>
           <Link to="/about" className="text-sm font-medium hover:text-primary transition-colors">About</Link>
          </nav>
        </header>

        <div className="flex-1">
          {children}
        </div>

        <footer className="border-t border-base-300 py-6 text-center text-sm text-base-content/50">
          Built by Alex
        </footer>

        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}

export default function App() {
  return <Outlet />
}
