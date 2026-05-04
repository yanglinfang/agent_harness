import type { AgentRun } from "@agent-harness/protocol";
import type { ModeOption } from "./ModeSwitcher";

interface InspectorPanelProps {
  run: AgentRun;
  mode: ModeOption;
}

function summaryFor(run: AgentRun, kind: string) {
  return run.capabilities.find((capability) => capability.kind === kind)?.summary;
}

export function InspectorPanel({ run, mode }: InspectorPanelProps) {
  const mcp = summaryFor(run, "mcp") ?? "—";
  const skills = summaryFor(run, "skill") ?? "—";
  const tools = summaryFor(run, "tool") ?? "—";
  const pending = run.trace.filter((event) => event.state === "waiting").length;

  return (
    <aside className="inspector">
      <header className="run-context-header">Run context</header>

      <div className="run-row">
        <span>Mode</span>
        <strong>{mode}</strong>
      </div>
      <div className="run-row">
        <span>Policy</span>
        <strong>{run.policy}</strong>
      </div>
      <div className="run-row">
        <span>Route</span>
        <strong>{run.modelRoute}</strong>
      </div>
      <div className="run-row">
        <span>Memory</span>
        <strong>personal · project · session</strong>
      </div>

      <hr className="run-divider" />

      <div className="run-row subtle">
        <span>MCP</span>
        <strong>{mcp}</strong>
      </div>
      <div className="run-row subtle">
        <span>Skills</span>
        <strong>{skills}</strong>
      </div>
      <div className="run-row subtle">
        <span>Tools</span>
        <strong>{tools}</strong>
      </div>
      <div className="run-row subtle">
        <span>Pending</span>
        <strong>{pending} permission{pending === 1 ? "" : "s"}</strong>
      </div>
    </aside>
  );
}
