import { useState } from "react";

const INSPECTOR_TABS = [
  "Memory",
  "Tools",
  "MCP",
  "Skills",
  "Permissions",
  "Trace",
] as const;

type InspectorTab = (typeof INSPECTOR_TABS)[number];

export function InspectorPanel() {
  const [tab, setTab] = useState<InspectorTab>(INSPECTOR_TABS[0]);

  return (
    <aside className="inspector">
      <div className="tabs" role="tablist" aria-label="Inspector">
        {INSPECTOR_TABS.map((option) => (
          <button
            key={option}
            type="button"
            role="tab"
            aria-selected={option === tab}
            className={option === tab ? "active" : ""}
            onClick={() => setTab(option)}
          >
            {option}
          </button>
        ))}
      </div>
      <section>
        <header>Personal</header>
        <div className="memory-row">
          <span>Prefers concise summaries</span>
          <strong>live</strong>
        </div>
        <div className="memory-row">
          <span>Timezone: America/Los_Angeles</span>
          <strong>live</strong>
        </div>
        <div className="memory-row">
          <span>Work focus: AI infra</span>
          <strong>live</strong>
        </div>
      </section>
      <section>
        <header>Project</header>
        <div className="memory-row">
          <span>Customer research synthesis</span>
          <strong>session</strong>
        </div>
        <div className="memory-row warn">
          <span>Complaint themes draft</span>
          <strong>ask</strong>
        </div>
      </section>
      <section>
        <header>Framework</header>
        <div className="kv">
          <span>MCP</span>
          <strong>5 connected</strong>
        </div>
        <div className="kv">
          <span>Skills</span>
          <strong>4 active</strong>
        </div>
        <div className="kv">
          <span>Permissions</span>
          <strong>8 rules</strong>
        </div>
        <div className="kv">
          <span>Trace</span>
          <strong>sealed</strong>
        </div>
      </section>
    </aside>
  );
}
