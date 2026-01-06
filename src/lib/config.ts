import * as v from "valibot";

export const AppConfigSchema = v.object({
  environment: v.picklist(["development", "production", "test"]),
  port: v.optional(
    v.pipe(v.number(), v.minValue(1024), v.maxValue(65535)),
    3000
  ),
  debug: v.optional(v.boolean(), false),
});

export type AppConfig = v.InferOutput<typeof AppConfigSchema>;

export const BuildMetadataSchema = v.object({
  version: v.string(),
  buildTime: v.string(),
  commitHash: v.optional(v.string()),
});

export type BuildMetadata = v.InferOutput<typeof BuildMetadataSchema>;

export function getConfig(): AppConfig {
  const env = process.env.NODE_ENV ?? "development";
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
  const debug = process.env.DEBUG === "true";

  return v.parse(AppConfigSchema, {
    environment: env as "development" | "production" | "test",
    port,
    debug,
  });
}
