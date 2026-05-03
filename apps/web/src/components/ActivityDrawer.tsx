import { useState } from "react";
import type { TraceEvent } from "@agent-harness/protocol";

const ACTIVITY_TABS = [
  "Tool calls",
  "Permissions",
  "Memory writes",
  "Trace events",
  "Problems",
] as const;

type ActivityTab = (typeof ACTIVITY_TABS)[number];

interface ActivityDrawerProps {
  events: TraceEvent[];
}

export function ActivityDrawer({ events }: ActivityDrawerProps) {
  const [tab, setTab] = useState<ActivityTab>(ACTIVITY_TABS[0]);

  return (
    <section className="activity">
      <div className="activity-tabs" role="tablist" aria-label="Activity">
        {ACTIVITY_TABS.map((option) => (
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
      <div className="event-list">
        {events.map((event) => (
          <div className="event" key={event.id}>
            <span>{event.at}</span>
            <strong>{event.kind.toUpperCase()}</strong>
            <p>
              {event.label} · {event.detail}
            </p>
            <em>{event.state}</em>
          </div>
        ))}
      </div>
    </section>
  );
}
