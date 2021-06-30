import React from "react";
import { render } from "@testing-library/react";
import TileRow from "./TileRow";

describe("TileRow", () => {
  it("renders the component properly", () => {
    const rendered = render(<TileRow tiles={[2, 4, 8, 16]} />);
    const tile2 = rendered.getByText("2");
    expect(tile2).toBeInTheDocument();
    const tile4 = rendered.getByText("4");
    expect(tile4).toBeInTheDocument();
    const tile8 = rendered.getByText("8");
    expect(tile8).toBeInTheDocument();
    const tile16 = rendered.getByText("16");
    expect(tile16).toBeInTheDocument();
  });
});
