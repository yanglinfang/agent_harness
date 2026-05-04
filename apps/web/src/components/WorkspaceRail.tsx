import type { ReactNode } from "react";
import type { WorkspaceSource } from "@agent-harness/protocol";

interface WorkspaceRailProps {
  sources: WorkspaceSource[];
  catalog: ReactNode;
}

function summarize(sources: WorkspaceSource[], kinds: WorkspaceSource["kind"][]) {
  return sources
    .filter((source) => kinds.includes(source.kind))
    .map((source) => source.summary)
    .join(" · ");
}

export function WorkspaceRail({ sources, catalog }: WorkspaceRailProps) {
  const workspace = summarize(sources, ["files", "docs"]);
  const appsBrowser = summarize(sources, ["apps", "browser"]);
  const repo = sources.find((source) => source.kind === "repos");
  const hasSources = sources.length > 0;

  return (
    <aside className="workspace">
      <div className="brand">
        <span className="mark">A</span>
        <strong>Agent Harness</strong>
      </div>

      {catalog}

      <section className="workspace-sources" aria-label="Workspace sources">
        <header className="run-catalog-header">Workspace</header>

        <div className="rail-item">
          <span>Files &amp; Docs</span>
          <small>{hasSources ? workspace || "—" : "—"}</small>
        </div>

        <div className="rail-item">
          <span>Apps &amp; Browser</span>
          <small>{hasSources ? appsBrowser || "—" : "—"}</small>
        </div>

        <div className="rail-item optional">
          <div className="rail-item-head">
            <span>Coding</span>
            <em>optional</em>
          </div>
          <small>{repo?.summary ?? "Connect a repo to enable diffs."}</small>
        </div>
      </section>
    </aside>
  );
}
