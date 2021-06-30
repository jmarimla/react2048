import { createTile, updateTiles } from "./AppActions";
import { ActionType, GameState } from "./AppTypes";

describe("CREATE_TILE", () => {
  it("has function createTile", () => {
    const actionObj = createTile({
      index: 2,
      value: 2048
    });
    expect(actionObj).toMatchObject({
      type: ActionType.CREATE_TILE,
      payload: {
        index: 2,
        value: 2048
      }
    });
  });

  it("has function updateTiles", () => {
    const actionObj = updateTiles([2, 4, 8, 16], GameState.ONGOING);
    expect(actionObj).toMatchObject({
      type: ActionType.UPDATE_TILES,
      payload: {
        tiles: [2, 4, 8, 16],
        gameState: GameState.ONGOING
      }
    });
  });
});
