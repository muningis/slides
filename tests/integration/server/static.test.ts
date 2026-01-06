/**
 * Integration tests for static file serving
 * Note: These tests start a real server subprocess to avoid happy-dom fetch interference
 */

import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import type { Subprocess } from "bun";

const TEST_PORT = 3457;
let serverProcess: Subprocess<"ignore", "pipe", "pipe"> | null = null;

// Store native fetch before happy-dom potentially overrides it
const bunFetch = Bun.fetch ?? globalThis.fetch;

beforeAll(async () => {
  // Build dist directory first
  const buildProcess = Bun.spawn(["bun", "run", "build"], {
    cwd: process.cwd(),
    stdout: "pipe",
    stderr: "pipe",
  });
  await buildProcess.exited;

  // Start the actual server as a subprocess
  serverProcess = Bun.spawn(["bun", "src/server/main.ts"], {
    cwd: process.cwd(),
    env: { ...process.env, PORT: String(TEST_PORT) },
    stdout: "pipe",
    stderr: "pipe",
  });

  // Give the server time to start
  await Bun.sleep(500);
});

afterAll(async () => {
  if (serverProcess) {
    serverProcess.kill();
    await serverProcess.exited;
  }
});

async function fetchFromServer(path: string): Promise<Response> {
  // Use Bun.fetch directly to bypass any global overrides
  return bunFetch(`http://localhost:${TEST_PORT}${path}`);
}

describe("Static File Serving", () => {
  it("serves existing JS files with correct content-type", async () => {
    const response = await fetchFromServer("/main.js");

    expect(response.status).toBe(200);
    const contentType = response.headers.get("content-type");
    expect(contentType).toContain("javascript");
  });

  it("serves CSS files with correct content-type", async () => {
    const response = await fetchFromServer("/styles.css");

    expect(response.status).toBe(200);
    const contentType = response.headers.get("content-type");
    expect(contentType).toContain("css");
  });

  it("returns 404 for non-existent files", async () => {
    const response = await fetchFromServer("/nonexistent-file.js");

    expect(response.status).toBe(404);
  });

  it("blocks path traversal attempts", async () => {
    const response = await fetchFromServer("/../package.json");

    // Should be blocked - 403 Forbidden or 404 Not Found
    expect([403, 404]).toContain(response.status);
  });

  it("blocks encoded path traversal attempts", async () => {
    const response = await fetchFromServer("/%2e%2e/package.json");

    // Should be blocked
    expect([403, 404]).toContain(response.status);
  });
});
