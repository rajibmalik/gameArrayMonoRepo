import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import GameCard from "../../../components/library/GameCard";

describe("GameCard", () => {
  it("renders game with correct data", () => {
    const mockGame = {
      appid: "1",
      name: "Test",
      headerImage: "test-image.jpg",
      playtimeHours: 10,
    };
    render(<GameCard game={mockGame} />);
    expect(screen.getByText("Test")).toBeInTheDocument();
    expect(screen.getByText("10 hours played")).toBeInTheDocument();
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("truncates long game names", () => {
    const name =
      "A very long game name that exceeds the maximum length allowed for a games name";
    const mockGame = {
      appid: "1",
      name: name,
      headerImage: "test-image.jpg",
      playtimeHours: 10,
    };
    render(<GameCard game={mockGame} />);
    const heading = screen.getByRole("heading");
    expect(heading).toHaveTextContent(
      "A very long game name that exceeds the maxim..."
    );
  });
});
