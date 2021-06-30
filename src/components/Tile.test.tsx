import React from "react";
import { render } from "@testing-library/react";
import Tile, { getTileClass } from "./Tile";
import styles from "./Tile.module.css";

describe("Tile Component", () => {
  it("renders an empty tile properly", () => {
    const rendered = render(<Tile tileValue={0} />);
    const tile = rendered.queryByText("0");
    expect(tile).toBeNull();
  });
});

describe("getTileClass function", () => {
  it("returns correct css classname", () => {
    expect(getTileClass(0)).toBe(styles.tileEmpty);
    expect(getTileClass(2)).toBe(styles.tileFilled);
  });
});
