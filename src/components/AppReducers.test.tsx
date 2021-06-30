import { ActionType, GameState } from "./AppTypes";
import { appReducer } from "./AppReducers";

describe("Tiles reducer", () => {
  it("has CREATE_TILE action", () => {
    const state = { gameState: GameState.ONGOING, tiles: [0, 0, 0, 0] };
    const newState = appReducer(state, {
      type: ActionType.CREATE_TILE,
      payload: { index: 2, value: 2048 }
    });
    expect(newState).toMatchObject({
      gameState: GameState.ONGOING,
      tiles: [0, 0, 2048, 0]
    });
  });

  it("has UPDATE_TILES action", () => {
    const state = { gameState: GameState.ONGOING, tiles: [0, 0, 0, 0] };
    const newState = appReducer(state, {
      type: ActionType.UPDATE_TILES,
      payload: { gameState: GameState.GAMEOVER, tiles: [2, 4, 8, 16] }
    });
    expect(newState).toMatchObject({
      gameState: GameState.GAMEOVER,
      tiles: [2, 4, 8, 16]
    });
  });
});
