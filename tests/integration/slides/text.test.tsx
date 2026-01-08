/**
 * Integration tests for TextSlide component
 * Tests: T032, T033
 */

import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { TextSlide } from "../../../src/client/components/slides/TextSlide.tsx";
import type { TextSlide as TextSlideType } from "../../../src/shared/types/presentation.ts";

describe("TextSlide", () => {
  // T032: Integration test for TextSlide with title
  it("renders text content with title", () => {
    const slide: TextSlideType = {
      type: "text",
      title: "Introduction",
      text: "This is the main content of the slide.",
    };

    render(<TextSlide slide={slide} />);

    expect(
      screen.getByRole("heading", { name: "Introduction" })
    ).toBeDefined();
    expect(
      screen.getByText("This is the main content of the slide.")
    ).toBeDefined();
  });

  // T033: Integration test for TextSlide without title
  it("renders text content without title", () => {
    const slide: TextSlideType = {
      type: "text",
      text: "Just some text without a title.",
    };

    const { container } = render(<TextSlide slide={slide} />);

    expect(screen.getByText("Just some text without a title.")).toBeDefined();
    // Check that this specific render doesn't include an h1
    expect(container.querySelector("h1")).toBeNull();
  });

  it("renders multi-line text content", () => {
    const slide: TextSlideType = {
      type: "text",
      text: "First line of text. Second line of text. Third line of text.",
    };

    render(<TextSlide slide={slide} />);

    expect(
      screen.getByText(
        "First line of text. Second line of text. Third line of text."
      )
    ).toBeDefined();
  });

  it("handles special characters in text", () => {
    const slide: TextSlideType = {
      type: "text",
      title: "Special <Characters>",
      text: "Text with & ampersand, 'quotes', and \"double quotes\"",
    };

    render(<TextSlide slide={slide} />);

    expect(
      screen.getByRole("heading", { name: "Special <Characters>" })
    ).toBeDefined();
    expect(
      screen.getByText("Text with & ampersand, 'quotes', and \"double quotes\"")
    ).toBeDefined();
  });
});
