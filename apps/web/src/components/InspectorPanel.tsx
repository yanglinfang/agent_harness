import type { RunInspectorView, TraceEvent } from "@agent-harness/protocol";
import type { ModeOption } from "./ModeSwitcher";

interface InspectorPanelProps {
  inspector: RunInspectorView | null;
  mode: ModeOption;
  model: string;
  activity: TraceEvent[];
}

export function InspectorPanel({ inspector, mode, model, activity }: InspectorPanelProps) {
  const pending = activity.filter((event) => event.state === "waiting").length;

  return (
    <aside className="inspector">
      <header className="run-context-header">Run context</header>

      <div className="inspector-row">
        <span>Mode</span>
        <strong>{mode}</strong>
      </div>
      <div className="inspector-row">
        <span>Policy</span>
        <strong>{inspector?.policy ?? "—"}</strong>
      </div>
      <div className="inspector-row">
        <span>Route</span>
        <strong>{model || "—"}</strong>
      </div>
      <div className="inspector-row">
        <span>Memory</span>
        <strong>{inspector?.memory ?? "—"}</strong>
      </div>

      <hr className="run-divider" />

      <div className="inspector-row subtle">
        <span>MCP</span>
        <strong>{inspector?.mcp ?? "—"}</strong>
      </div>
      <div className="inspector-row subtle">
        <span>Skills</span>
        <strong>{inspector?.skills ?? "—"}</strong>
      </div>
      <div className="inspector-row subtle">
        <span>Tools</span>
        <strong>{inspector?.tools ?? "—"}</strong>
      </div>
      <div className="inspector-row subtle">
        <span>Pending</span>
        <strong>
          {pending} permission{pending === 1 ? "" : "s"}
        </strong>
      </div>
    </aside>
  );
}
