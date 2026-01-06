import { describe, expect, it } from "bun:test";
import * as v from "valibot";
import { AppConfigSchema, getConfig } from "../../src/lib/config.ts";

describe("AppConfigSchema", () => {
  it("validates correct configuration", () => {
    const config = {
      environment: "development" as const,
      port: 3000,
      debug: false,
    };

    const result = v.safeParse(AppConfigSchema, config);
    expect(result.success).toBe(true);
  });

  it("rejects invalid environment", () => {
    const config = {
      environment: "invalid",
      port: 3000,
      debug: false,
    };

    const result = v.safeParse(AppConfigSchema, config);
    expect(result.success).toBe(false);
  });

  it("rejects invalid port (too low)", () => {
    const config = {
      environment: "development" as const,
      port: 80,
      debug: false,
    };

    const result = v.safeParse(AppConfigSchema, config);
    expect(result.success).toBe(false);
  });

  it("uses default values", () => {
    const config = {
      environment: "production" as const,
    };

    const result = v.parse(AppConfigSchema, config);
    expect(result.port).toBe(3000);
    expect(result.debug).toBe(false);
  });
});

describe("getConfig", () => {
  it("returns a valid configuration object", () => {
    const config = getConfig();
    expect(config).toBeDefined();
    expect(config.environment).toBeDefined();
    expect(config.port).toBeDefined();
  });
});
