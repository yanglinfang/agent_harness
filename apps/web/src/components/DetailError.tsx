interface DetailErrorProps {
  runId: string;
  message: string;
  onRetry: () => void;
}

export function DetailError({ runId, message, onRetry }: DetailErrorProps) {
  return (
    <section className="detail-message" role="alert">
      <p>
        <strong>Could not load run.</strong> Runtime returned{" "}
        <code>{message}</code> for <code>{runId}</code>.
      </p>
      <button type="button" className="detail-message-cta" onClick={onRetry}>
        Retry
      </button>
    </section>
  );
}
