import type { Capability } from "@agent-harness/protocol";

interface CapabilityStripProps {
  capabilities: Capability[];
}

export function CapabilityStrip({ capabilities }: CapabilityStripProps) {
  return (
    <div className="cap-strip">
      {capabilities.map((capability) => (
        <div className="cap" key={capability.id}>
          <span>{capability.label}</span>
          <strong>{capability.summary}</strong>
        </div>
      ))}
    </div>
  );
}
