import React from "react";
import { render } from "@testing-library/react";
import { Game } from "./Game";
import { connect } from "react-redux";

jest.mock("./Button", () => {
  return {
    __esModule: true,
    default: () => {
      return <button data-testid="button"></button>;
    }
  };
});

describe("Game Component", () => {
  it("renders the game properly", () => {
    const rendered = render(
      <Game
        tiles={[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]}
        createInitialTile={() => {}}
      />
    );
    const tileRows = rendered.getAllByTestId("tile-row");
    expect(tileRows.length).toBe(4);
    const tileContainers = rendered.getAllByTestId("tile");
    expect(tileContainers.length).toBe(16);
    const controls = rendered.getAllByTestId("controls");
    expect(controls.length).toBe(1);
    const buttons = rendered.getAllByTestId("button");
    expect(buttons.length).toBe(4);
  });
});
