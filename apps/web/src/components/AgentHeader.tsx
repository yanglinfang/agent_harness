import type { ModeOption } from "./ModeSwitcher";

interface AgentHeaderProps {
  title: string;
  mode: ModeOption;
}

export function AgentHeader({ title, mode }: AgentHeaderProps) {
  return (
    <header className="hero">
      <h1>{title}</h1>
      <span className="mode-tag">{mode.toLowerCase()} mode</span>
    </header>
  );
}
