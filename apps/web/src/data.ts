import type { AgentRun } from "@agent-harness/protocol";

export const activeRun: AgentRun = {
  id: "run_8b3f2a",
  mode: "general",
  title: "General Agent Workspace",
  policy: "strict",
  modelRoute: "auto: cloud reasoning + local retrieval",
  workspace: [
    { id: "files", kind: "files", label: "Files", status: "connected", summary: "14 pinned files" },
    { id: "docs", kind: "docs", label: "Docs", status: "connected", summary: "Notion and Google Docs" },
    { id: "repos", kind: "repos", label: "Repos", status: "needs-review", summary: "2 available, coding mode optional" },
    { id: "browser", kind: "browser", label: "Browser", status: "connected", summary: "3 active tabs" },
    { id: "apps", kind: "apps", label: "Apps", status: "connected", summary: "Calendar, mail, Slack, GitHub" },
  ],
  capabilities: [
    { id: "memory", kind: "memory", label: "Memory", status: "active", summary: "personal, project, session" },
    { id: "tools", kind: "tool", label: "Tools", status: "active", summary: "8 governed tools" },
    { id: "mcp", kind: "mcp", label: "MCP", status: "active", summary: "5 connected servers" },
    { id: "skills", kind: "skill", label: "Skills", status: "active", summary: "4 active skills" },
    { id: "permissions", kind: "permission", label: "Permissions", status: "active", summary: "strict default-deny policy" },
    { id: "trace", kind: "trace", label: "Trace", status: "active", summary: "42 sealed events" },
  ],
  trace: [
    { id: "ev_101", at: "10:43:14", kind: "tool", label: "mcp.notion.search", detail: "customer research H1 -> 12 results", state: "ok" },
    { id: "ev_102", at: "10:43:11", kind: "tool", label: "fs.read", detail: "interview-notes/2026-04-22-acme.md", state: "ok" },
    { id: "ev_103", at: "10:43:08", kind: "permission", label: "auto-approve", detail: "fs.read within whitelisted workspace", state: "ok" },
    { id: "ev_104", at: "10:43:05", kind: "memory", label: "memory.project", detail: "wrote complaint-themes draft", state: "waiting" },
    { id: "ev_105", at: "10:42:58", kind: "model", label: "model route", detail: "cloud reasoning, local embedding retrieval", state: "running" },
    { id: "ev_106", at: "10:42:52", kind: "permission", label: "approval-required", detail: "net.fetch external domain", state: "waiting" },
  ],
};
