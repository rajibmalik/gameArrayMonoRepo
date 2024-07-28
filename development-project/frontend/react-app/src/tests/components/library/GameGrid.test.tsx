import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import useUserGames from "../../../hooks/useUserGames";
import GameGrid from "../../../components/library/GameGrid";

// import GameCard from "../../../hooks/useUserGames";

vi.mock("../../../hooks/useUserGames");

describe("GameGrid", () => {
  it("correctly renders game card data for one GameCard", () => {
    const mockGame = [
      {
        appid: "1",
        name: "GameOne",
        playtimeHours: 10,
        headerImage: "imageOne.jpg",
      },
    ];

    vi.mocked(useUserGames).mockReturnValue({
      userGames: mockGame,
      error: "",
      isLoading: false,
    });

    render(
      <GameGrid
        gameQuery={{
          steamID: 123,
          username: "userOne",
          searchText: "",
          genre: "",
        }}
      />
    );

    expect(screen.getByText("GameOne")).toBeInTheDocument();
    expect(screen.getByText("10 hours played")).toBeInTheDocument();
    const image = screen.getByRole("img") as HTMLImageElement;
    expect(image).toHaveAttribute("src", "imageOne.jpg");
  });
  it("correctly renders game card data for two GameCards", () => {
    const mockGames = [
      {
        appid: "1",
        name: "GameOne",
        playtimeHours: 10,
        headerImage: "imageOne.jpg",
      },
      {
        appid: "2",
        name: "GameTwo",
        playtimeHours: 15,
        headerImage: "imageTwo.jpg",
      },
    ];

    vi.mocked(useUserGames).mockReturnValue({
      userGames: mockGames,
      error: "",
      isLoading: false,
    });

    render(
      <GameGrid
        gameQuery={{
          steamID: 123,
          username: "userOne",
          searchText: "",
          genre: "",
        }}
      />
    );

    const names = screen.getAllByRole("heading");
    const images = screen.getAllByRole("img");
    // regex as unable to use getAllByRole for Badge component
    const badges = screen.getAllByText(/hours played/);

    mockGames.forEach((game, index) => {
      expect(names[index]).toHaveTextContent(game.name);
      expect(images[index]).toHaveAttribute("src", game.headerImage);
      expect(badges[index]).toHaveTextContent(
        `${game.playtimeHours} hours played`
      );
    });
  });
});
