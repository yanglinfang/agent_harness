import { useCallback, useEffect, useRef, useState } from "react";
import type { RunDetail, RunSummary } from "@agent-harness/protocol";
import {
  RuntimeError,
  fetchHealth,
  fetchRunDetail,
  fetchRuns,
} from "./client";

export type RunsState =
  | { kind: "loading" }
  | { kind: "ready"; runs: RunSummary[] }
  | { kind: "empty" }
  | {
      kind: "error";
      message: string;
      lastTriedAt: string;
      cachedRuns: RunSummary[];
    };

export type DetailState =
  | { kind: "idle" }
  | { kind: "loading"; runId: string }
  | { kind: "ready"; runId: string; detail: RunDetail }
  | { kind: "not_found"; runId: string }
  | { kind: "error"; runId: string; message: string };

interface UseRunCatalog {
  runs: RunsState;
  detail: DetailState;
  selectedRunId: string | null;
  selectRun: (runId: string) => void;
  retry: () => void;
}

function nowStamp(): string {
  return new Date().toLocaleTimeString();
}

export function useRunCatalog(): UseRunCatalog {
  const [runs, setRuns] = useState<RunsState>({ kind: "loading" });
  const [detail, setDetail] = useState<DetailState>({ kind: "idle" });
  const [selectedRunId, setSelectedRunId] = useState<string | null>(null);
  const [reloadToken, setReloadToken] = useState(0);

  const detailCache = useRef<Map<string, RunDetail>>(new Map());

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    setRuns((prev) =>
      prev.kind === "error"
        ? { kind: "error", message: prev.message, lastTriedAt: prev.lastTriedAt, cachedRuns: prev.cachedRuns }
        : { kind: "loading" },
    );

    (async () => {
      try {
        await fetchHealth(controller.signal);
        const list = await fetchRuns(controller.signal);
        if (cancelled) return;
        if (list.runs.length === 0) {
          setRuns({ kind: "empty" });
          setSelectedRunId(null);
          return;
        }
        setRuns({ kind: "ready", runs: list.runs });
        setSelectedRunId((prev) => prev ?? list.runs[0].run_id);
      } catch (error) {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }
        const message = error instanceof Error ? error.message : "unknown_error";
        setRuns((prev) => ({
          kind: "error",
          message,
          lastTriedAt: nowStamp(),
          cachedRuns: prev.kind === "ready" ? prev.runs : prev.kind === "error" ? prev.cachedRuns : [],
        }));
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [reloadToken]);

  useEffect(() => {
    if (!selectedRunId) {
      setDetail({ kind: "idle" });
      return;
    }
    const cached = detailCache.current.get(selectedRunId);
    if (cached) {
      setDetail({ kind: "ready", runId: selectedRunId, detail: cached });
      return;
    }
    const controller = new AbortController();
    let cancelled = false;
    setDetail({ kind: "loading", runId: selectedRunId });

    (async () => {
      try {
        const result = await fetchRunDetail(selectedRunId, controller.signal);
        if (cancelled) return;
        detailCache.current.set(selectedRunId, result);
        setDetail({ kind: "ready", runId: selectedRunId, detail: result });
      } catch (error) {
        if (cancelled || (error instanceof DOMException && error.name === "AbortError")) {
          return;
        }
        if (error instanceof RuntimeError && error.status === 404) {
          setDetail({ kind: "not_found", runId: selectedRunId });
          return;
        }
        const message = error instanceof Error ? error.message : "unknown_error";
        setDetail({ kind: "error", runId: selectedRunId, message });
      }
    })();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [selectedRunId, reloadToken]);

  const selectRun = useCallback((runId: string) => {
    setSelectedRunId(runId);
  }, []);

  const retry = useCallback(() => {
    setReloadToken((token) => token + 1);
  }, []);

  return { runs, detail, selectedRunId, selectRun, retry };
}
