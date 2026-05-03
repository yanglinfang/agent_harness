import type { WorkspaceSource } from "@agent-harness/protocol";

interface WorkspaceRailProps {
  sources: WorkspaceSource[];
}

function summarize(sources: WorkspaceSource[], kinds: WorkspaceSource["kind"][]) {
  return sources
    .filter((source) => kinds.includes(source.kind))
    .map((source) => source.summary)
    .join(" · ");
}

export function WorkspaceRail({ sources }: WorkspaceRailProps) {
  const workspace = summarize(sources, ["files", "docs"]);
  const appsBrowser = summarize(sources, ["apps", "browser"]);
  const repo = sources.find((source) => source.kind === "repos");

  return (
    <aside className="workspace">
      <div className="brand">
        <span className="mark">A</span>
        <strong>Agent Harness</strong>
      </div>

      <button type="button" className="rail-item">
        <span>Workspace</span>
        <small>{workspace || "No files or docs connected"}</small>
      </button>

      <button type="button" className="rail-item">
        <span>Apps &amp; Browser</span>
        <small>{appsBrowser || "No apps or browser connected"}</small>
      </button>

      <div className="rail-item optional">
        <div className="rail-item-head">
          <span>Coding</span>
          <em>optional</em>
        </div>
        <small>{repo?.summary ?? "Connect a repo to enable diffs."}</small>
      </div>
    </aside>
  );
}
