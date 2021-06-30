import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import Game from "./components/Game";

jest.mock("./components/Game", () => {
  return {
    __esModule: true,
    default: () => {
      return <div data-testid="game"></div>;
    }
  };
});

describe("App Component", () => {
  it("renders the header properly", () => {
    const rendered = render(<App />);
    const title = rendered.getByText("2048");
    expect(title).toBeInTheDocument();
    const subtitle = rendered.getByText("A React implementation of the game");
    expect(subtitle).toBeInTheDocument();
    const game = rendered.getByTestId("game");
    expect(game).toBeInTheDocument();
  });
});
