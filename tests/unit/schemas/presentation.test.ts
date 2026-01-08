/**
 * Unit tests for presentation schema validation
 * Tests: T010, T011, T012
 */

import { describe, expect, it } from "bun:test";
import { validatePresentation } from "../../../src/shared/schemas/presentation.ts";

describe("Presentation Schema Validation", () => {
  // T010: Unit test for valid presentation schema
  describe("valid presentations", () => {
    it("validates a presentation with title slide", () => {
      const data = {
        slides: [{ type: "title", title: "Welcome" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.slides).toHaveLength(1);
        expect(result.data.slides[0]?.type).toBe("title");
      }
    });

    it("validates a presentation with title-subtitle slide", () => {
      const data = {
        slides: [
          { type: "title-subtitle", title: "Main Title", subtitle: "Subtitle" },
        ],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.slides[0]?.type).toBe("title-subtitle");
      }
    });

    it("validates a presentation with text slide", () => {
      const data = {
        slides: [
          { type: "text", title: "Optional Title", text: "Some content here" },
        ],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
    });

    it("validates a presentation with bullets slide", () => {
      const data = {
        slides: [
          {
            type: "bullets",
            title: "Key Points",
            items: ["First", "Second", "Third"],
          },
        ],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
      if (result.success) {
        const firstSlide = result.data.slides[0];
        if (firstSlide?.type === "bullets") {
          expect(firstSlide.items).toHaveLength(3);
        }
      }
    });

    it("validates a presentation with code slide", () => {
      const data = {
        slides: [
          {
            type: "code",
            language: "typescript",
            blocks: ["const x = 1;", "const x = 1;\nconst y = 2;"],
          },
        ],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
    });

    it("validates a presentation with timeline slide", () => {
      const data = {
        slides: [
          {
            type: "timeline",
            title: "Project History",
            events: [
              { title: "Start", date: "2024-01" },
              { title: "Launch", description: "Product launch" },
            ],
          },
        ],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
    });

    it("validates a presentation with multiple slide types", () => {
      const data = {
        slides: [
          { type: "title", title: "Welcome" },
          { type: "text", text: "Introduction" },
          { type: "bullets", items: ["A", "B"] },
        ],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.slides).toHaveLength(3);
      }
    });

    it("validates empty slides array", () => {
      const data = { slides: [] };

      const result = validatePresentation(data);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data.slides).toHaveLength(0);
      }
    });
  });

  // T011: Unit test for invalid slide type rejection
  describe("invalid slide types", () => {
    it("rejects unknown slide type", () => {
      const data = {
        slides: [{ type: "unknown", title: "Test" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors).toBeDefined();
        expect(result.errors.length).toBeGreaterThan(0);
      }
    });

    it("rejects slide without type field", () => {
      const data = {
        slides: [{ title: "No type" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });
  });

  // T012: Unit test for missing required fields
  describe("missing required fields", () => {
    it("rejects title slide without title", () => {
      const data = {
        slides: [{ type: "title" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.errors.some((e: string) => e.includes("title"))).toBe(
          true
        );
      }
    });

    it("rejects title-subtitle slide without subtitle", () => {
      const data = {
        slides: [{ type: "title-subtitle", title: "Main" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });

    it("rejects text slide without text", () => {
      const data = {
        slides: [{ type: "text", title: "Has title" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });

    it("rejects bullets slide without items", () => {
      const data = {
        slides: [{ type: "bullets", title: "Points" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });

    it("rejects code slide without blocks", () => {
      const data = {
        slides: [{ type: "code", language: "typescript" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });

    it("rejects code slide without language", () => {
      const data = {
        slides: [{ type: "code", blocks: ["code"] }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });

    it("rejects timeline slide without events", () => {
      const data = {
        slides: [{ type: "timeline", title: "History" }],
      };

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });

    it("rejects presentation without slides array", () => {
      const data = {};

      const result = validatePresentation(data);

      expect(result.success).toBe(false);
    });
  });
});
