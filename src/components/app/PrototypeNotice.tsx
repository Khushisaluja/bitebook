// ---------------------------------------------------------------------------
// Shown beside the phone shell on every /(app) route, never on the landing.
// Sets expectations for anyone opening the prototype cold, and points back to
// the rest of the portfolio.
// ---------------------------------------------------------------------------

const PORTFOLIO = 'https://khushisaluja.framer.website/'

export default function PrototypeNotice() {
  return (
    <aside className="bb-notice bb-photo-grain" role="note" aria-label="prototype notice">
      <div className="bb-notice-head">
        <span className="bb-notice-tag">
          <span className="bb-notice-dot" aria-hidden="true" />
          prototype · v1
        </span>
        <span className="bb-notice-wip">under construction</span>
      </div>

      <p className="bb-notice-copy">
        This is a product design prototype of <strong>bitebook</strong>, designed by{' '}
        <strong>Khushi Saluja</strong>. It&rsquo;s a v1 design. The app is still being built, so
        the screens and data here are illustrative.
      </p>

      <a className="bb-notice-link" href={PORTFOLIO} target="_blank" rel="noopener noreferrer">
        see more of khushi&rsquo;s work
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7 17 17 7M9 7h8v8" />
        </svg>
      </a>
    </aside>
  )
}
