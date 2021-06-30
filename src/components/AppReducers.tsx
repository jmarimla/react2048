import { ActionType, GameState } from "./AppTypes";
import { initialState } from "./Util";

export const appReducer = (state = initialState, action: any) => {
  const { type, payload } = action;
  switch (type) {
    case ActionType.CREATE_TILE:
      const temp = state.tiles.map((item, index) => {
        if (index !== payload.index) {
          return item;
        }
        return payload.value;
      });
      return {
        ...state,
        tiles: temp,
        gameState: GameState.ONGOING
      };
    case ActionType.UPDATE_TILES:
      return {
        ...state,
        tiles: payload.tiles,
        gameState: payload.gameState
      };
    case ActionType.RESTART_GAME:
      return action.payload;
    default:
      return state;
  }
};
