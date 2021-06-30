import { ActionType, GameState, Action, TilePayload } from "./AppTypes";
import { initialState } from "./Util";

export const createTile = (tilePayload: TilePayload): Action => {
  return {
    type: ActionType.CREATE_TILE,
    payload: tilePayload
  };
};

export const updateTiles = (
  tiles: Array<number>,
  gameState: GameState
): Action => {
  return {
    type: ActionType.UPDATE_TILES,
    payload: { tiles: tiles, gameState: gameState }
  };
};

export const restartGame = (): Action => {
  return {
    type: ActionType.RESTART_GAME,
    payload: initialState
  };
};
