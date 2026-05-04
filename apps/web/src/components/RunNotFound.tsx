interface RunNotFoundProps {
  runId: string;
  onBack: () => void;
  canBack: boolean;
}

export function RunNotFound({ runId, onBack, canBack }: RunNotFoundProps) {
  return (
    <section className="detail-message" role="alert">
      <p>
        <strong>Run not found.</strong> The runtime had no record of{" "}
        <code>{runId}</code>.
      </p>
      <button
        type="button"
        className="detail-message-cta"
        onClick={onBack}
        disabled={!canBack}
      >
        Back to runs
      </button>
    </section>
  );
}
