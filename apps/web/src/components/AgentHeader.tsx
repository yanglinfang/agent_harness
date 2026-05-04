import type { RunStatus } from "@agent-harness/protocol";
import type { ModeOption } from "./ModeSwitcher";

interface AgentHeaderProps {
  title: string;
  intent: string;
  status: RunStatus;
  mode: ModeOption;
}

export function AgentHeader({ title, intent, status, mode }: AgentHeaderProps) {
  return (
    <header className="hero">
      <div className="hero-text">
        <h1>{title}</h1>
        <p className="hero-intent">{intent}</p>
      </div>
      <div className="hero-meta">
        <span className="hero-status" data-status={status}>
          {status}
        </span>
        <span className="mode-tag">{mode.toLowerCase()} mode</span>
      </div>
    </header>
  );
}
