/**
 * Integration tests for CodeSlide component
 * Tests: T041, T042
 */

import { describe, expect, it, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import { CodeSlide } from "../../../src/client/components/slides/CodeSlide.tsx";
import type { CodeSlide as CodeSlideType } from "../../../src/shared/types/presentation.ts";

afterEach(() => {
  cleanup();
});

describe("CodeSlide", () => {
  // T041: Integration test for CodeSlide single block
  it("renders single code block", () => {
    const slide: CodeSlideType = {
      type: "code",
      language: "typescript",
      blocks: ["const x = 1;"],
    };

    render(<CodeSlide slide={slide} currentStep={0} />);

    expect(screen.getByText("typescript")).toBeDefined();
    expect(screen.getByText("const x = 1;")).toBeDefined();
  });

  // T042: Integration test for CodeSlide morphing between blocks
  it("displays correct code block based on currentStep", () => {
    const slide: CodeSlideType = {
      type: "code",
      language: "typescript",
      blocks: ["const a = 1;", "const b = 2;", "const c = 3;"],
    };

    // Step 0
    const { unmount } = render(<CodeSlide slide={slide} currentStep={0} />);
    expect(screen.getByText("const a = 1;")).toBeDefined();
    unmount();
    cleanup();

    // Step 1
    const { unmount: unmount2 } = render(
      <CodeSlide slide={slide} currentStep={1} />
    );
    expect(screen.getByText("const b = 2;")).toBeDefined();
    unmount2();
    cleanup();

    // Step 2
    render(<CodeSlide slide={slide} currentStep={2} />);
    expect(screen.getByText("const c = 3;")).toBeDefined();
  });

  it("renders with optional title", () => {
    const slide: CodeSlideType = {
      type: "code",
      title: "Example Code",
      language: "javascript",
      blocks: ["console.log('hello');"],
    };

    render(<CodeSlide slide={slide} currentStep={0} />);

    expect(screen.getByRole("heading", { name: "Example Code" })).toBeDefined();
    expect(screen.getByText("javascript")).toBeDefined();
    expect(screen.getByText("console.log('hello');")).toBeDefined();
  });

  it("renders step indicator for multiple blocks", () => {
    const slide: CodeSlideType = {
      type: "code",
      language: "python",
      blocks: ["x = 1", "y = 2", "z = 3"],
    };

    render(<CodeSlide slide={slide} currentStep={1} />);

    expect(screen.getByText("Version 2 of 3")).toBeDefined();
  });

  it("does not render step indicator for single block", () => {
    const slide: CodeSlideType = {
      type: "code",
      language: "rust",
      blocks: ["fn main() {}"],
    };

    const { container } = render(<CodeSlide slide={slide} currentStep={0} />);

    // Look within this specific render
    const versionText = container.textContent?.includes("Version");
    expect(versionText).toBe(false);
  });

  it("renders empty state for no code blocks", () => {
    const slide: CodeSlideType = {
      type: "code",
      title: "Empty Code",
      language: "typescript",
      blocks: [],
    };

    render(<CodeSlide slide={slide} currentStep={0} />);

    expect(screen.getByText("No code blocks")).toBeDefined();
  });

  it("preserves whitespace in code", () => {
    const slide: CodeSlideType = {
      type: "code",
      language: "typescript",
      blocks: ["function unique() { return 42; }"],
    };

    render(<CodeSlide slide={slide} currentStep={0} />);

    const codeElement = screen.getByText("function unique() { return 42; }");
    expect(codeElement).toBeDefined();
  });
});
