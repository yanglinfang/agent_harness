import type { WorkspaceSource } from "@agent-harness/protocol";

interface WorkspaceRailProps {
  sources: WorkspaceSource[];
}

export function WorkspaceRail({ sources }: WorkspaceRailProps) {
  return (
    <aside className="workspace">
      <div className="brand">
        <span className="mark">A</span>
        <div>
          <strong>Agent Harness</strong>
          <small>local + cloud workspace</small>
        </div>
      </div>

      <section>
        <header>Workspace</header>
        {sources.map((source) => (
          <button className="source" key={source.id}>
            <span>{source.label}</span>
            <small>{source.summary}</small>
          </button>
        ))}
      </section>

      <section>
        <header>Coding is optional</header>
        <div className="repo-card">
          <span className="status-dot pending" />
          <div>
            <strong>Connect a repo</strong>
            <small>Enable diffs, tests, and review-gated apply.</small>
          </div>
        </div>
      </section>
    </aside>
  );
}
