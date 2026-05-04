export type AgentMode = "general" | "coding" | "research" | "automation";

export type CapabilityKind =
  | "tool"
  | "mcp"
  | "skill"
  | "memory"
  | "workspace"
  | "model"
  | "permission"
  | "trace";

export type PermissionState = "allowed" | "approval-required" | "blocked";

export interface WorkspaceSource {
  id: string;
  label: string;
  kind: "files" | "docs" | "repos" | "browser" | "apps";
  status: "connected" | "disconnected" | "needs-review";
  summary: string;
}

export interface Capability {
  id: string;
  kind: CapabilityKind;
  label: string;
  status: "active" | "available" | "disabled";
  summary: string;
}

export interface TraceEvent {
  id: string;
  at: string;
  kind: "tool" | "permission" | "memory" | "model" | "trace";
  label: string;
  detail: string;
  state: "ok" | "running" | "waiting" | "blocked";
}

export interface AgentRun {
  id: string;
  mode: AgentMode;
  title: string;
  policy: "strict" | "balanced" | "open";
  modelRoute: string;
  workspace: WorkspaceSource[];
  capabilities: Capability[];
  trace: TraceEvent[];
}

export type RunStatus = "running" | "ready" | "blocked" | "complete";

export interface RunSummary {
  run_id: string;
  title: string;
  intent: string;
  status: RunStatus;
  mode: AgentMode;
  updated_at: string;
}

export interface RunMessage {
  id: string;
  role: "user" | "agent";
  at: string;
  text: string;
  steps?: string[];
}

export interface RunInspectorView {
  policy: "strict" | "balanced" | "open";
  memory: string;
  mcp: string;
  skills: string;
  tools: string;
}

export interface RunDetail extends RunSummary {
  model: string;
  capabilities: Capability[];
  workspace: WorkspaceSource[];
  messages: RunMessage[];
  activity: TraceEvent[];
  inspector: RunInspectorView;
}

export interface RunListResponse {
  runs: RunSummary[];
}

export interface ApiError {
  error: string;
  run_id?: string;
  path?: string;
  detail?: string;
}
