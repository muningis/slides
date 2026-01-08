/**
 * Integration tests for TitleSlide and TitleSubtitleSlide components
 * Tests: T027, T028
 */

import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { TitleSlide } from "../../../src/client/components/slides/TitleSlide.tsx";
import { TitleSubtitleSlide } from "../../../src/client/components/slides/TitleSubtitleSlide.tsx";
import type { TitleSlide as TitleSlideType } from "../../../src/shared/types/presentation.ts";
import type { TitleSubtitleSlide as TitleSubtitleSlideType } from "../../../src/shared/types/presentation.ts";

describe("TitleSlide", () => {
  // T027: Integration test for TitleSlide rendering
  it("renders the title text", () => {
    const slide: TitleSlideType = {
      type: "title",
      title: "Welcome to My Presentation",
    };

    render(<TitleSlide slide={slide} />);

    expect(
      screen.getByRole("heading", { name: "Welcome to My Presentation" })
    ).toBeDefined();
  });

  it("renders title with correct styling", () => {
    const slide: TitleSlideType = {
      type: "title",
      title: "Test Title",
    };

    render(<TitleSlide slide={slide} />);

    const heading = screen.getByRole("heading", { name: "Test Title" });
    expect(heading.tagName).toBe("H1");
  });

  it("handles special characters in title", () => {
    const slide: TitleSlideType = {
      type: "title",
      title: "Title with <special> & 'characters'",
    };

    render(<TitleSlide slide={slide} />);

    expect(
      screen.getByRole("heading", {
        name: "Title with <special> & 'characters'",
      })
    ).toBeDefined();
  });
});

describe("TitleSubtitleSlide", () => {
  // T028: Integration test for TitleSubtitleSlide rendering
  it("renders both title and subtitle", () => {
    const slide: TitleSubtitleSlideType = {
      type: "title-subtitle",
      title: "Main Title",
      subtitle: "Supporting Subtitle",
    };

    render(<TitleSubtitleSlide slide={slide} />);

    expect(screen.getByRole("heading", { name: "Main Title" })).toBeDefined();
    expect(screen.getByText("Supporting Subtitle")).toBeDefined();
  });

  it("renders title as h1 and subtitle as h2", () => {
    const slide: TitleSubtitleSlideType = {
      type: "title-subtitle",
      title: "Title",
      subtitle: "Subtitle",
    };

    render(<TitleSubtitleSlide slide={slide} />);

    const title = screen.getByRole("heading", { name: "Title" });
    expect(title.tagName).toBe("H1");

    // Find h2 by querying specifically
    const headings = screen.getAllByRole("heading");
    const h2 = headings.find(
      (h) => h.tagName === "H2" && h.textContent === "Subtitle"
    );
    expect(h2).toBeDefined();
  });

  it("handles long titles and subtitles", () => {
    const slide: TitleSubtitleSlideType = {
      type: "title-subtitle",
      title: "This is a very long title that might wrap to multiple lines",
      subtitle:
        "This is an even longer subtitle that provides additional context",
    };

    render(<TitleSubtitleSlide slide={slide} />);

    expect(
      screen.getByRole("heading", {
        name: "This is a very long title that might wrap to multiple lines",
      })
    ).toBeDefined();
    expect(
      screen.getByText(
        "This is an even longer subtitle that provides additional context"
      )
    ).toBeDefined();
  });
});
