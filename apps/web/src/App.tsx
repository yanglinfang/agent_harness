import { useEffect, useState } from "react";
import type { AgentMode } from "@agent-harness/protocol";
import { useRunCatalog } from "./api/useRunCatalog";
import { WorkspaceRail } from "./components/WorkspaceRail";
import { AgentHeader } from "./components/AgentHeader";
import { ModeSwitcher, type ModeOption } from "./components/ModeSwitcher";
import { ConversationStream } from "./components/ConversationStream";
import { ActivityDrawer } from "./components/ActivityDrawer";
import { InspectorPanel } from "./components/InspectorPanel";
import { RunCatalog } from "./components/RunCatalog";
import { DetailSkeleton } from "./components/DetailSkeleton";
import { RunNotFound } from "./components/RunNotFound";
import { DetailError } from "./components/DetailError";

function toModeOption(mode: AgentMode): ModeOption {
  return (mode.charAt(0).toUpperCase() + mode.slice(1)) as ModeOption;
}

function firstAvailableRunId(state: ReturnType<typeof useRunCatalog>["runs"]): string | null {
  if (state.kind === "ready" && state.runs.length > 0) return state.runs[0].run_id;
  if (state.kind === "error" && state.cachedRuns.length > 0) return state.cachedRuns[0].run_id;
  return null;
}

export function App() {
  const { runs, detail, selectedRunId, selectRun, retry } = useRunCatalog();
  const [mode, setMode] = useState<ModeOption>("General");

  useEffect(() => {
    if (detail.kind === "ready") {
      setMode(toModeOption(detail.detail.mode));
    }
  }, [detail]);

  const detailRun = detail.kind === "ready" ? detail.detail : null;
  const sources = detailRun?.workspace ?? [];
  const messages = detailRun?.messages ?? [];
  const activity = detailRun?.activity ?? [];

  const handleBack = () => {
    const fallback = firstAvailableRunId(runs);
    if (fallback) selectRun(fallback);
  };

  const canBack = firstAvailableRunId(runs) !== null;

  return (
    <main className="shell">
      <WorkspaceRail
        sources={sources}
        catalog={
          <RunCatalog
            state={runs}
            selectedRunId={selectedRunId}
            onSelect={selectRun}
            onRetry={retry}
          />
        }
      />

      <section className="center">
        {detail.kind === "ready" && detailRun && (
          <>
            <AgentHeader
              title={detailRun.title}
              intent={detailRun.intent}
              status={detailRun.status}
              mode={mode}
            />
            <ModeSwitcher mode={mode} onSelect={setMode} />
            <ConversationStream mode={mode} messages={messages} />
            <ActivityDrawer events={activity} />
          </>
        )}

        {(detail.kind === "loading" || detail.kind === "idle") && <DetailSkeleton />}

        {detail.kind === "not_found" && (
          <RunNotFound runId={detail.runId} onBack={handleBack} canBack={canBack} />
        )}

        {detail.kind === "error" && (
          <DetailError runId={detail.runId} message={detail.message} onRetry={retry} />
        )}
      </section>

      <InspectorPanel
        inspector={detailRun?.inspector ?? null}
        mode={mode}
        model={detailRun?.model ?? ""}
        activity={activity}
      />
    </main>
  );
}
