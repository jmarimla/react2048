export enum ActionType {
  CREATE_TILE,
  UPDATE_TILES,
  RESTART_GAME
}

export enum GameState {
  START,
  ONGOING,
  GAMEOVER,
  GAMEWINNER
}

export enum ButtonDirection {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right"
}

export interface TilePayload {
  index: number;
  value: number;
}

export interface Action {
  type: ActionType;
  payload: any;
}
