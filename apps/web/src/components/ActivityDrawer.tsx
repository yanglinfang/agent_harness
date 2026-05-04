import type { TraceEvent } from "@agent-harness/protocol";

interface ActivityDrawerProps {
  events: TraceEvent[];
}

export function ActivityDrawer({ events }: ActivityDrawerProps) {
  const latest = events[0];
  const pending = events.filter((event) => event.state === "waiting").length;

  return (
    <footer className="signals" aria-label="Recent activity">
      <span className="signals-count">{events.length} trace events</span>
      {pending > 0 && (
        <span className="signals-pending">{pending} pending permission{pending === 1 ? "" : "s"}</span>
      )}
      {latest && (
        <span className="signals-latest">
          {latest.at} · {latest.kind} · {latest.label}
        </span>
      )}
    </footer>
  );
}
