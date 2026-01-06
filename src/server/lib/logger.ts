/**
 * Structured JSON logger for HTTP requests
 * Writes to stdout for production log aggregation
 */

interface LogEntry<T> {
  timestamp: number;
  namespace: string;
  payload: T;
}

interface HttpRequestPayload {
  method: string;
  path: string;
  status: number;
  duration: number;
}

interface ServerPayload {
  event: string;
  port: number;
}

/**
 * Write a structured log entry to stdout
 */
function writeLog<T>(namespace: string, payload: T): void {
  const entry: LogEntry<T> = {
    timestamp: Date.now(),
    namespace,
    payload,
  };
  process.stdout.write(JSON.stringify(entry) + "\n");
}

/**
 * Log an HTTP request with structured JSON format
 */
export function logRequest(
  request: Request,
  status: number,
  startTime: number
): void {
  const duration = Date.now() - startTime;
  const url = new URL(request.url);

  const payload: HttpRequestPayload = {
    method: request.method,
    path: url.pathname,
    status,
    duration,
  };

  writeLog("http-request", payload);
}

/**
 * Log server startup
 */
export function logServerStart(port: number): void {
  const payload: ServerPayload = {
    event: "start",
    port,
  };

  writeLog("server", payload);
}
