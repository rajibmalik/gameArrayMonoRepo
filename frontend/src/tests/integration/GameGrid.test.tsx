import { render, screen, waitFor } from "@testing-library/react";
import GameGrid from "../../components/library/GameGrid"; // Adjust path as needed
import { describe, it, expect, beforeAll, afterEach, afterAll } from "vitest";
import { server } from "../../mocks/server"; // Adjust path as needed

// Setup mocked server (MSW)
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("GameGrid Component", () => {
  it("displays game data correctly", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
          showFavourites: false,
          rating: null,
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Game One")).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
      expect(screen.getByText("10 hours played")).toBeInTheDocument();
      expect(screen.getByText("Game Two")).toBeInTheDocument();
      expect(screen.getByText("20%")).toBeInTheDocument();
      expect(screen.getByText("20 hours played")).toBeInTheDocument();
      expect(screen.getByText("Game Three")).toBeInTheDocument();
      expect(screen.getByText("5 hours played")).toBeInTheDocument();
      expect(screen.getByText("30%")).toBeInTheDocument();

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(4);
      expect(images[0]).toHaveAttribute("src", "imageOne");
      expect(images[1]).toHaveAttribute("src", "imageTwo");
      expect(images[2]).toHaveAttribute("src", "imageThree");
    });
  });

  it("displays 'Game Four' according to searchText", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "Game Four",
          genre: "",
          sort: "",
          showFavourites: false,
          rating: null,
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Game Four")).toBeInTheDocument();
      expect(screen.getByText("90%")).toBeInTheDocument();
      expect(screen.getByText("500 hours played")).toBeInTheDocument();

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", "imageFour");
    });
  });

  it("displays 'Game Four' according to searchText", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "Action",
          sort: "",
          showFavourites: false,
          rating: null,
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Game One")).toBeInTheDocument();
      expect(screen.getByText("50%")).toBeInTheDocument();
      expect(screen.getByText("10 hours played")).toBeInTheDocument();

      expect(screen.getByText("Game Three")).toBeInTheDocument();
      expect(screen.getByText("30%")).toBeInTheDocument();
      expect(screen.getByText("5 hours played")).toBeInTheDocument();

      expect(screen.getByText("Game Four")).toBeInTheDocument();
      expect(screen.getByText("90%")).toBeInTheDocument();
      expect(screen.getByText("500 hours played")).toBeInTheDocument();

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(3);
    });
  });

  it("displays games in the correct order according to sory by playtime", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "playtime",
          showFavourites: false,
          rating: null,
        }}
      />
    );

    await waitFor(() => {
      const gameTitles = screen.getAllByRole("heading");

      expect(gameTitles[0]).toHaveTextContent("Game Four");
      expect(gameTitles[1]).toHaveTextContent("Game Two");
      expect(gameTitles[2]).toHaveTextContent("Game One");
      expect(gameTitles[3]).toHaveTextContent("Game Three");

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(4);
    });
  });

  it("displays games in the correct order according to name", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "name",
          showFavourites: false,
          rating: null,
        }}
      />
    );

    await waitFor(() => {
      const gameTitles = screen.getAllByRole("heading");

      expect(gameTitles[0]).toHaveTextContent("Game Four");
      expect(gameTitles[1]).toHaveTextContent("Game One");
      expect(gameTitles[2]).toHaveTextContent("Game Three");
      expect(gameTitles[3]).toHaveTextContent("Game Two");

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(4);
    });
  });

  it("displays favourite games", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
          showFavourites: true,
          rating: null,
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Game Four")).toBeInTheDocument();
      expect(screen.getByText("90%")).toBeInTheDocument();
      expect(screen.getByText("500 hours played")).toBeInTheDocument();

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", "imageFour");
    });
  });

  it("displays games with a rating of 1", async () => {
    render(
      <GameGrid
        gameQuery={{
          steamID: "76561197960287930",
          username: "userOne",
          searchText: "",
          genre: "",
          sort: "",
          showFavourites: false,
          rating: 1,
        }}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Game Three")).toBeInTheDocument();
      expect(screen.getByText("30%")).toBeInTheDocument();
      expect(screen.getByText("5 hours played")).toBeInTheDocument();

      const images = screen.getAllByRole("img");
      expect(images).toHaveLength(1);
      expect(images[0]).toHaveAttribute("src", "imageThree");
    });
  });
});
