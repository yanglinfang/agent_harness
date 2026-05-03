import type { ModeOption } from "./ModeSwitcher";

interface AgentHeaderProps {
  title: string;
  policy: string;
  modelRoute: string;
  mode: ModeOption;
}

const MODE_TAGLINES: Record<ModeOption, string> = {
  General:
    "Ask for everyday work. Connect files, docs, browser, apps, tools, and repos under one governed agent framework.",
  Coding:
    "Optional coding mode. Connect a repo to enable diffs, tests, and review-gated apply.",
  Research:
    "Gather, cluster, and cite sources across your connected docs, browser tabs, and notes.",
  Automation:
    "Drive multi-step tool flows across apps and the browser, with permissions and trace events at every step.",
};

export function AgentHeader({ title, policy, modelRoute, mode }: AgentHeaderProps) {
  return (
    <>
      <nav className="topbar">
        <span>Workspaces / acme / General Agent</span>
        <span className="kbd">⌘K Search</span>
      </nav>

      <header className="hero">
        <div>
          <h1>{title}</h1>
          <p>{MODE_TAGLINES[mode]}</p>
        </div>
        <div className="route">
          <span>policy: {policy}</span>
          <span>{modelRoute}</span>
          <span>mode: {mode.toLowerCase()}</span>
        </div>
      </header>
    </>
  );
}
