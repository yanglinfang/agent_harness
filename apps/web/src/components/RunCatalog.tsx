import type { RunSummary } from "@agent-harness/protocol";
import type { RunsState } from "../api/useRunCatalog";

interface RunCatalogProps {
  state: RunsState;
  selectedRunId: string | null;
  onSelect: (runId: string) => void;
  onRetry: () => void;
}

function CatalogSkeleton() {
  return (
    <div className="run-list" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="run-row skeleton" key={index}>
          <span className="skeleton-bar skeleton-bar-title" />
          <span className="skeleton-bar skeleton-bar-meta" />
        </div>
      ))}
    </div>
  );
}

function CatalogEmpty() {
  return (
    <div className="run-empty">
      <p>No runs yet</p>
      <button type="button" className="run-empty-cta" disabled>
        New run
      </button>
    </div>
  );
}

interface CatalogListProps {
  runs: RunSummary[];
  selectedRunId: string | null;
  onSelect: (runId: string) => void;
  dimmed?: boolean;
}

function CatalogList({ runs, selectedRunId, onSelect, dimmed }: CatalogListProps) {
  return (
    <ul className={`run-list${dimmed ? " dimmed" : ""}`} role="list">
      {runs.map((run) => {
        const selected = run.run_id === selectedRunId;
        return (
          <li key={run.run_id}>
            <button
              type="button"
              className={`run-row${selected ? " selected" : ""}`}
              aria-current={selected ? "page" : undefined}
              onClick={() => onSelect(run.run_id)}
            >
              <span className="run-row-title">{run.title}</span>
              <span className="run-row-meta">
                <span className="run-row-status" data-status={run.status}>
                  {run.status}
                </span>
                <span className="capability-badge" data-mode={run.mode}>
                  {run.mode}
                </span>
              </span>
              <span className="run-row-intent">{run.intent}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function RunCatalog({ state, selectedRunId, onSelect, onRetry }: RunCatalogProps) {
  return (
    <section className="run-catalog" aria-label="Runs">
      <header className="run-catalog-header">Runs</header>

      {state.kind === "loading" && <CatalogSkeleton />}

      {state.kind === "empty" && <CatalogEmpty />}

      {state.kind === "ready" && (
        <CatalogList
          runs={state.runs}
          selectedRunId={selectedRunId}
          onSelect={onSelect}
        />
      )}

      {state.kind === "error" && (
        <>
          <div className="rail-error" role="alert">
            <div className="rail-error-text">
              <strong>Runtime unavailable</strong>
              <small>last tried {state.lastTriedAt}</small>
            </div>
            <button type="button" className="rail-error-retry" onClick={onRetry}>
              Retry
            </button>
          </div>
          {state.cachedRuns.length > 0 && (
            <CatalogList
              runs={state.cachedRuns}
              selectedRunId={selectedRunId}
              onSelect={onSelect}
              dimmed
            />
          )}
        </>
      )}
    </section>
  );
}
