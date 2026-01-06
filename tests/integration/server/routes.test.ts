/**
 * Integration tests for server routes
 * Tests home route (/) and slides route (/slides/:slug)
 */

import { describe, expect, it, beforeAll, afterAll } from "bun:test";
import type { Subprocess } from "bun";

const TEST_PORT = 3458;
let serverProcess: Subprocess<"ignore", "pipe", "pipe"> | null = null;

// Store native fetch before happy-dom potentially overrides it
const bunFetch = Bun.fetch ?? globalThis.fetch;

beforeAll(async () => {
  // Start the server as a subprocess
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
  return bunFetch(`http://localhost:${TEST_PORT}${path}`);
}

describe("Home Route (/)", () => {
  it("returns 200 status", async () => {
    const response = await fetchFromServer("/");

    expect(response.status).toBe(200);
  });

  it("returns text content", async () => {
    const response = await fetchFromServer("/");
    const text = await response.text();

    expect(text).toContain("Slides");
  });

  it("has correct content-type", async () => {
    const response = await fetchFromServer("/");
    const contentType = response.headers.get("content-type");

    expect(contentType).toContain("text/plain");
  });
});

describe("Slides Route (/slides/:slug)", () => {
  it("returns 200 for valid slug", async () => {
    const response = await fetchFromServer("/slides/my-presentation");

    expect(response.status).toBe(200);
  });

  it("captures the slug in response", async () => {
    const response = await fetchFromServer("/slides/test-slug");
    const text = await response.text();

    expect(text).toContain("test-slug");
  });

  it("handles URL-encoded slugs", async () => {
    const response = await fetchFromServer("/slides/my%20presentation");
    const text = await response.text();

    expect(text).toContain("my presentation");
  });

  it("returns 404 for /slides/ without slug", async () => {
    const response = await fetchFromServer("/slides/");

    expect(response.status).toBe(404);
  });

  it("returns 404 for /slides without trailing slash", async () => {
    // This should fall through to static file handling and return 404
    const response = await fetchFromServer("/slides");

    expect(response.status).toBe(404);
  });
});
