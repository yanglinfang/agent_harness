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
