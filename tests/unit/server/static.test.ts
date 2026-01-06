import { describe, expect, it } from "bun:test";
import { isValidStaticPath } from "../../../src/server/lib/static.ts";

describe("Path Traversal Detection", () => {
  it("allows simple file paths", () => {
    expect(isValidStaticPath("main.js")).toBe(true);
    expect(isValidStaticPath("styles.css")).toBe(true);
    expect(isValidStaticPath("index.html")).toBe(true);
  });

  it("allows paths with subdirectories", () => {
    expect(isValidStaticPath("assets/image.png")).toBe(true);
    expect(isValidStaticPath("js/app.js")).toBe(true);
    expect(isValidStaticPath("css/styles.css")).toBe(true);
  });

  it("rejects paths containing ..", () => {
    expect(isValidStaticPath("../package.json")).toBe(false);
    expect(isValidStaticPath("foo/../bar")).toBe(false);
    expect(isValidStaticPath("..")).toBe(false);
  });

  it("rejects paths with encoded ..", () => {
    expect(isValidStaticPath("%2e%2e/package.json")).toBe(false);
    expect(isValidStaticPath("foo/%2e%2e/bar")).toBe(false);
  });

  it("allows paths with single dots", () => {
    expect(isValidStaticPath("file.name.js")).toBe(true);
    expect(isValidStaticPath(".hidden")).toBe(true);
  });

  it("allows paths with leading slash (URL format)", () => {
    expect(isValidStaticPath("/main.js")).toBe(true);
    expect(isValidStaticPath("/assets/image.png")).toBe(true);
  });

  it("rejects Windows absolute paths", () => {
    expect(isValidStaticPath("C:\\Windows\\System32")).toBe(false);
    expect(isValidStaticPath("D:/Users/file.txt")).toBe(false);
  });
});
