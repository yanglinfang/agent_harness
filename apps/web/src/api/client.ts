import type {
  ApiError,
  RunDetail,
  RunListResponse,
} from "@agent-harness/protocol";

const DEFAULT_BASE = "http://127.0.0.1:8787";

function envBase(): string | undefined {
  const env = (import.meta as ImportMeta & {
    env?: Record<string, string | undefined>;
  }).env;
  return env?.VITE_RUNTIME_URL;
}

export const runtimeBaseUrl: string = envBase() ?? DEFAULT_BASE;

export class RuntimeError extends Error {
  status: number;
  body: ApiError | null;

  constructor(message: string, status: number, body: ApiError | null) {
    super(message);
    this.name = "RuntimeError";
    this.status = status;
    this.body = body;
  }
}

async function readJson<T>(response: Response): Promise<T> {
  if (response.ok) {
    return (await response.json()) as T;
  }
  let body: ApiError | null = null;
  try {
    body = (await response.json()) as ApiError;
  } catch {
    body = null;
  }
  throw new RuntimeError(
    body?.error ?? `request_failed_${response.status}`,
    response.status,
    body,
  );
}

export async function fetchHealth(signal?: AbortSignal): Promise<{ ok: boolean }> {
  const response = await fetch(`${runtimeBaseUrl}/health`, { signal });
  return readJson<{ ok: boolean }>(response);
}

export async function fetchRuns(signal?: AbortSignal): Promise<RunListResponse> {
  const response = await fetch(`${runtimeBaseUrl}/runs`, { signal });
  return readJson<RunListResponse>(response);
}

export async function fetchRunDetail(
  runId: string,
  signal?: AbortSignal,
): Promise<RunDetail> {
  const response = await fetch(
    `${runtimeBaseUrl}/runs/${encodeURIComponent(runId)}`,
    { signal },
  );
  return readJson<RunDetail>(response);
}
