export function DetailSkeleton() {
  return (
    <>
      <header className="hero" aria-hidden="true">
        <span className="skeleton-bar skeleton-bar-h1" />
        <span className="skeleton-bar skeleton-bar-tag" />
      </header>
      <div className="mode-switcher" aria-hidden="true">
        {Array.from({ length: 4 }).map((_, index) => (
          <span key={index} className="skeleton-bar skeleton-bar-mode" />
        ))}
      </div>
      <section className="conversation" aria-hidden="true">
        <div className="message">
          <span className="skeleton-bar skeleton-bar-meta" />
          <span className="skeleton-bar skeleton-bar-line" />
          <span className="skeleton-bar skeleton-bar-line short" />
        </div>
        <div className="message agent">
          <span className="skeleton-bar skeleton-bar-meta" />
          <span className="skeleton-bar skeleton-bar-line" />
          <span className="skeleton-bar skeleton-bar-line" />
          <span className="skeleton-bar skeleton-bar-line short" />
        </div>
      </section>
      <footer className="signals" aria-hidden="true">
        <span className="skeleton-bar skeleton-bar-meta" />
      </footer>
    </>
  );
}
