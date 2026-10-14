export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-netflix-black vignette">
      <div className="text-center px-6">
        <p className="eyebrow mb-4">Lost your way?</p>
        <h1 className="font-display text-8xl md:text-9xl text-white mb-4">404</h1>
        <p className="text-lg text-white/60 mb-8 max-w-md mx-auto">
          Sorry, we can&apos;t find that page. You&apos;ll find lots to explore on the home page.
        </p>
        <a href="/" className="btn-netflix-red">
          Portfolio Home
        </a>
      </div>
    </div>
  )
}
