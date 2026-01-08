import { describe, expect, it, afterEach } from "bun:test";
import { render, screen, cleanup } from "@testing-library/react";
import App from "../../src/client/components/App.tsx";

afterEach(() => {
  cleanup();
});

describe("App", () => {
  it("renders the welcome message", () => {
    render(<App />);
    // Look for the heading specifically
    expect(screen.getByRole("heading", { name: "Slides" })).toBeDefined();
  });

  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });

  it("shows no-presentation state when no URL is set", () => {
    render(<App />);
    expect(
      screen.getByText("A modern presentation application")
    ).toBeDefined();
  });
});
