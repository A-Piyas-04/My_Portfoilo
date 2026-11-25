'use client'

import { projects, tryNowIds } from '@/data/portfolio'

export const usableProjects = tryNowIds.map((id) => projects.find((p) => p.id === id)).filter((p) => p?.tryNow)

export const TRY_KINDS = {
  plugin: {
    tag: 'Claude Code Plugin',
    icon: <path d="M9 3v5m6-5v5M6 8h12v3a6 6 0 0 1-12 0V8zm6 9v4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />,
  },
  web: { tag: 'In Browser', icon: <path d="M6 4v16l14-8z" fill="currentColor" /> },
  download: {
    tag: 'Windows App',
    icon: <path d="M12 4v11m0 0l-4.5-4.5M12 15l4.5-4.5M5 19h14" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  },
  skill: {
    tag: 'Claude Skill',
    icon: <path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4zM18.5 16l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8z" fill="currentColor" />,
  },
  offline: {
    tag: 'Offline',
    icon: <path d="M5 7l5 5-5 5M13 17h6" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />,
  },
}

export default function TryNowGrid({ onInfo }) {
  return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {usableProjects.map((p) => {
          const kind = TRY_KINDS[p.tryNow.kind] ?? TRY_KINDS.web
          return (
            <article
              key={p.id}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-white/10 p-5 shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-colors duration-300 hover:border-netflix-red/60"
              style={{ background: 'radial-gradient(circle at 0% 0%, rgba(229,9,20,0.18), transparent 50%), linear-gradient(160deg, #1c1c1c, #121212 60%, #0b0b0b)' }}
            >
              <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider">
                <span className="rounded-sm bg-netflix-red px-1.5 py-0.5">{kind.tag}</span>
                <span className="text-[#46d369]">Available now</span>
              </div>
              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.2em] text-netflix-red">{p.category}</p>
              <h4 className="mt-1 font-display text-3xl leading-none tracking-wide">{p.title}</h4>
              <p className="mt-2 line-clamp-3 flex-1 text-xs leading-snug text-white/55">{p.description}</p>
              {p.tryNow.note && <p className="mt-3 text-[11px] font-medium text-white/40">{p.tryNow.note}</p>}
              <div className="mt-4 flex gap-2">
                <a
                  href={p.tryNow.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-netflix flex-1 whitespace-nowrap !px-3 !py-2 text-sm"
                >
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                    {kind.icon}
                  </svg>
                  {p.tryNow.label}
                </a>
                {onInfo ? (
                  <button
                    type="button"
                    onClick={() => onInfo(p)}
                    aria-label={`More info about ${p.title}`}
                    className="btn-netflix-ghost !px-3 !py-2 text-sm"
                  >
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" strokeLinecap="round" />
                    </svg>
                  </button>
                ) : (
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Source code for ${p.title}`}
                  className="btn-netflix-ghost !px-3 !py-2 text-sm"
                >
                  Source
                </a>
                )}
              </div>
            </article>
          )
        })}
      </div>
  )
}
