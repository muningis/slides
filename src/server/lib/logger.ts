/**
 * Structured JSON logger for HTTP requests
 * Writes to stdout for production log aggregation
 */

interface RequestLog {
  timestamp: string;
  method: string;
  path: string;
  status: number;
  duration: number;
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

  const log: RequestLog = {
    timestamp: new Date().toISOString(),
    method: request.method,
    path: url.pathname,
    status,
    duration,
  };

  process.stdout.write(JSON.stringify(log) + "\n");
}

/**
 * Log server startup
 */
export function logServerStart(port: number): void {
  const log = {
    timestamp: new Date().toISOString(),
    event: "server_start",
    port,
  };

  process.stdout.write(JSON.stringify(log) + "\n");
}
