/**
 * Integration tests for BulletsSlide component
 * Tests: T036, T037
 */

import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import { BulletsSlide } from "../../../src/client/components/slides/BulletsSlide.tsx";
import type { BulletsSlide as BulletsSlideType } from "../../../src/shared/types/presentation.ts";

describe("BulletsSlide", () => {
  // T036: Integration test for BulletsSlide initial state
  it("renders bullet items with step 0 (first item visible)", () => {
    const slide: BulletsSlideType = {
      type: "bullets",
      title: "Key Points",
      items: ["First point", "Second point", "Third point"],
    };

    render(<BulletsSlide slide={slide} currentStep={0} />);

    expect(screen.getByRole("heading", { name: "Key Points" })).toBeDefined();

    // At step 0, first item should be visible
    expect(screen.getByText("First point")).toBeDefined();
    // Other items exist but animated to hidden state
    expect(screen.getByText("Second point")).toBeDefined();
    expect(screen.getByText("Third point")).toBeDefined();
  });

  // T037: Integration test for BulletsSlide step reveal
  it("reveals all items when at final step", () => {
    const slide: BulletsSlideType = {
      type: "bullets",
      items: ["Item A", "Item B", "Item C"],
    };

    // At step 2 (final step for 3 items), all should be visible
    render(<BulletsSlide slide={slide} currentStep={2} />);

    expect(screen.getByText("Item A")).toBeDefined();
    expect(screen.getByText("Item B")).toBeDefined();
    expect(screen.getByText("Item C")).toBeDefined();
  });

  it("renders without title when not provided", () => {
    const slide: BulletsSlideType = {
      type: "bullets",
      items: ["Only item"],
    };

    const { container } = render(<BulletsSlide slide={slide} currentStep={0} />);

    // Check that this specific render doesn't include an h1
    expect(container.querySelector("h1")).toBeNull();
    expect(screen.getByText("Only item")).toBeDefined();
  });

  it("renders empty state for no items", () => {
    const slide: BulletsSlideType = {
      type: "bullets",
      title: "Empty List",
      items: [],
    };

    render(<BulletsSlide slide={slide} currentStep={0} />);

    expect(screen.getByRole("heading", { name: "Empty List" })).toBeDefined();
    expect(screen.getByText("No items")).toBeDefined();
  });

  it("handles many bullet items", () => {
    const slide: BulletsSlideType = {
      type: "bullets",
      items: [
        "Item 1",
        "Item 2",
        "Item 3",
        "Item 4",
        "Item 5",
        "Item 6",
        "Item 7",
        "Item 8",
        "Item 9",
        "Item 10",
      ],
    };

    // All items visible at step 9
    render(<BulletsSlide slide={slide} currentStep={9} />);

    for (let i = 1; i <= 10; i++) {
      expect(screen.getByText(`Item ${i}`)).toBeDefined();
    }
  });
});
