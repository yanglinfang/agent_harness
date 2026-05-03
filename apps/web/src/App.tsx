import { activeRun } from "./data";

const modes = ["General", "Coding", "Research", "Automation"];
const inspectorTabs = ["Memory", "Tools", "MCP", "Skills", "Permissions", "Trace"];
const activityTabs = ["Tool calls", "Permissions", "Memory writes", "Trace events", "Problems"];

export function App() {
  return (
    <main className="shell">
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
          {activeRun.workspace.map((source) => (
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

      <section className="center">
        <nav className="topbar">
          <span>Workspaces / acme / General Agent</span>
          <span className="kbd">⌘K Search</span>
        </nav>

        <header className="hero">
          <div>
            <h1>{activeRun.title}</h1>
            <p>Ask for everyday work. Connect files, docs, browser, apps, tools, and repos under one governed agent framework.</p>
          </div>
          <div className="route">
            <span>policy: {activeRun.policy}</span>
            <span>{activeRun.modelRoute}</span>
          </div>
        </header>

        <div className="mode-switcher">
          {modes.map((mode) => (
            <button className={mode === "General" ? "active" : ""} key={mode}>{mode}</button>
          ))}
        </div>

        <div className="cap-strip">
          {activeRun.capabilities.map((capability) => (
            <div className="cap" key={capability.id}>
              <span>{capability.label}</span>
              <strong>{capability.summary}</strong>
            </div>
          ))}
        </div>

        <section className="conversation">
          <article className="message user">
            <span>you · 10:42</span>
            <p>Pull the last 3 months of customer research interviews, find recurring onboarding complaints, and write a 1-page engineering brief with direct quotes.</p>
          </article>
          <article className="message agent">
            <span>agent · general mode · safe sandbox</span>
            <p>Plan generated. Retrieval and clustering stay local; synthesis can route to cloud reasoning. No writes outside the session workspace without approval.</p>
            <ol>
              <li>Index connected docs through MCP.</li>
              <li>Read interview notes from workspace files.</li>
              <li>Cluster recurring complaints with a skill.</li>
              <li>Draft the brief and request permission before sharing.</li>
            </ol>
          </article>
          <article className="permission-card">
            <strong>Permission requested · net.fetch</strong>
            <p>External link found in a transcript. Network is default-deny, so the agent needs approval before fetching it.</p>
            <div>
              <button>Allow once</button>
              <button>Allow + remember</button>
              <button className="danger">Deny</button>
            </div>
          </article>
        </section>

        <form className="composer">
          <input placeholder="Continue the task, attach @context, or run /skill..." />
          <button type="button">@ context</button>
          <button type="button">/ skill</button>
          <button type="button">+ tool</button>
          <button type="submit">Send</button>
        </form>

        <section className="activity">
          <div className="activity-tabs">
            {activityTabs.map((tab, index) => (
              <button className={index === 0 ? "active" : ""} key={tab}>{tab}</button>
            ))}
          </div>
          <div className="event-list">
            {activeRun.trace.map((event) => (
              <div className="event" key={event.id}>
                <span>{event.at}</span>
                <strong>{event.kind.toUpperCase()}</strong>
                <p>{event.label} · {event.detail}</p>
                <em>{event.state}</em>
              </div>
            ))}
          </div>
        </section>
      </section>

      <aside className="inspector">
        <div className="tabs">
          {inspectorTabs.map((tab, index) => (
            <button className={index === 0 ? "active" : ""} key={tab}>{tab}</button>
          ))}
        </div>
        <section>
          <header>Personal</header>
          <div className="memory-row"><span>Prefers concise summaries</span><strong>live</strong></div>
          <div className="memory-row"><span>Timezone: America/Los_Angeles</span><strong>live</strong></div>
          <div className="memory-row"><span>Work focus: AI infra</span><strong>live</strong></div>
        </section>
        <section>
          <header>Project</header>
          <div className="memory-row"><span>Customer research synthesis</span><strong>session</strong></div>
          <div className="memory-row warn"><span>Complaint themes draft</span><strong>ask</strong></div>
        </section>
        <section>
          <header>Framework</header>
          <div className="kv"><span>MCP</span><strong>5 connected</strong></div>
          <div className="kv"><span>Skills</span><strong>4 active</strong></div>
          <div className="kv"><span>Permissions</span><strong>8 rules</strong></div>
          <div className="kv"><span>Trace</span><strong>sealed</strong></div>
        </section>
      </aside>
    </main>
  );
}
