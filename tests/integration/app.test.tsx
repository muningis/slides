import { describe, expect, it } from "bun:test";
import { render, screen } from "@testing-library/react";
import App from "../../src/components/App.tsx";

describe("App", () => {
  it("renders the welcome message", () => {
    render(<App />);
    expect(screen.getByText(/slides/i)).toBeDefined();
  });

  it("renders without crashing", () => {
    const { container } = render(<App />);
    expect(container).toBeDefined();
  });
});
