import { useState } from "react";
import { activeRun } from "./data";
import { WorkspaceRail } from "./components/WorkspaceRail";
import { AgentHeader } from "./components/AgentHeader";
import { ModeSwitcher, type ModeOption } from "./components/ModeSwitcher";
import { ConversationStream } from "./components/ConversationStream";
import { ActivityDrawer } from "./components/ActivityDrawer";
import { InspectorPanel } from "./components/InspectorPanel";

export function App() {
  const [mode, setMode] = useState<ModeOption>("General");

  return (
    <main className="shell">
      <WorkspaceRail sources={activeRun.workspace} />

      <section className="center">
        <AgentHeader title={activeRun.title} mode={mode} />
        <ModeSwitcher mode={mode} onSelect={setMode} />
        <ConversationStream mode={mode} />
        <ActivityDrawer events={activeRun.trace} />
      </section>

      <InspectorPanel run={activeRun} mode={mode} />
    </main>
  );
}
