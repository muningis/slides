/**
 * Integration tests for TimelineSlide component
 * Tests: T048, T049
 */

import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { TimelineSlide } from "../../../src/client/components/slides/TimelineSlide.tsx";
import type { TimelineSlide as TimelineSlideType } from "../../../src/shared/types/presentation.ts";

describe("TimelineSlide", () => {
  // T048: Integration test for TimelineSlide initial state
  it("renders timeline with first event visible at step 0", () => {
    const slide: TimelineSlideType = {
      type: "timeline",
      title: "Project History",
      events: [
        { title: "Project Start", date: "2024-01", description: "Initial idea" },
        { title: "Alpha Release", date: "2024-06" },
        { title: "Beta Release", date: "2024-09" },
      ],
    };

    render(<TimelineSlide slide={slide} currentStep={0} />);

    expect(
      screen.getByRole("heading", { name: "Project History" })
    ).toBeDefined();
    expect(screen.getByText("Project Start")).toBeDefined();
    expect(screen.getByText("2024-01")).toBeDefined();
    expect(screen.getByText("Initial idea")).toBeDefined();
  });

  // T049: Integration test for TimelineSlide step reveal
  it("reveals events step by step", () => {
    const slide: TimelineSlideType = {
      type: "timeline",
      events: [
        { title: "Event 1" },
        { title: "Event 2" },
        { title: "Event 3" },
      ],
    };

    // At step 2, all events should be visible
    render(<TimelineSlide slide={slide} currentStep={2} />);

    expect(screen.getByText("Event 1")).toBeDefined();
    expect(screen.getByText("Event 2")).toBeDefined();
    expect(screen.getByText("Event 3")).toBeDefined();
  });

  it("renders events with optional fields", () => {
    const slide: TimelineSlideType = {
      type: "timeline",
      events: [
        { title: "Title Only" },
        { title: "With Date", date: "2024-03" },
        { title: "With Description", description: "Some description" },
        {
          title: "Full Event",
          date: "2024-12",
          description: "Complete event data",
        },
      ],
    };

    render(<TimelineSlide slide={slide} currentStep={3} />);

    expect(screen.getByText("Title Only")).toBeDefined();
    expect(screen.getByText("With Date")).toBeDefined();
    expect(screen.getByText("2024-03")).toBeDefined();
    expect(screen.getByText("With Description")).toBeDefined();
    expect(screen.getByText("Some description")).toBeDefined();
    expect(screen.getByText("Full Event")).toBeDefined();
    expect(screen.getByText("2024-12")).toBeDefined();
    expect(screen.getByText("Complete event data")).toBeDefined();
  });

  it("renders without title when not provided", () => {
    const slide: TimelineSlideType = {
      type: "timeline",
      events: [{ title: "Single Event" }],
    };

    const { container } = render(<TimelineSlide slide={slide} currentStep={0} />);

    // Check that this specific render doesn't include an h1
    expect(container.querySelector("h1")).toBeNull();
    // Event titles are h3, so the event itself is visible
    expect(screen.getByText("Single Event")).toBeDefined();
  });

  it("renders empty state for no events", () => {
    const slide: TimelineSlideType = {
      type: "timeline",
      title: "Empty Timeline",
      events: [],
    };

    render(<TimelineSlide slide={slide} currentStep={0} />);

    expect(
      screen.getByRole("heading", { name: "Empty Timeline" })
    ).toBeDefined();
    expect(screen.getByText("No events")).toBeDefined();
  });

  it("handles single event timeline", () => {
    const slide: TimelineSlideType = {
      type: "timeline",
      events: [
        {
          title: "Only Event",
          date: "2024-05-15",
          description: "The one and only",
        },
      ],
    };

    render(<TimelineSlide slide={slide} currentStep={0} />);

    expect(screen.getByText("Only Event")).toBeDefined();
    expect(screen.getByText("2024-05-15")).toBeDefined();
    expect(screen.getByText("The one and only")).toBeDefined();
  });
});
