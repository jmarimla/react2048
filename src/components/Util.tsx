import { ButtonDirection, GameState } from "./AppTypes";

export const initialState = {
  gameState: GameState.START,
  tiles: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
};

export const TOTAL_ROWS = 4;
export const TOTAL_TILES_PER_ROW = 4;

export const directionStyles = {
  up: "buttonUp",
  down: "buttonDown",
  left: "buttonLeft",
  right: "buttonRight"
};

export const getRandomIndex = () => {
  const totalTiles = TOTAL_ROWS * TOTAL_TILES_PER_ROW;
  return Math.floor(Math.random() * totalTiles);
};

export const processTileLine = (tileLine: Array<number>) => {
  let temp = tileLine.filter((item) => item > 0);
  //merge adjacent same values
  for (let i = temp.length; i > 1; i--) {
    if (temp[i - 1] == temp[i - 2]) {
      temp[i - 1] = temp[i - 1] * 2;
      temp[i - 2] = 0;
    }
  }
  //cleanup
  temp = temp.filter((item) => item > 0);
  //fill with zeroes
  while (temp.length < TOTAL_TILES_PER_ROW) {
    temp.unshift(0);
  }
  return temp;
};

export const getGroupLines = (
  direction: ButtonDirection,
  tiles: Array<number>
): Array<Array<number>> => {
  let indexOrder: Array<number> = [];
  switch (direction) {
    case ButtonDirection.RIGHT:
      indexOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      break;
    case ButtonDirection.LEFT:
      indexOrder = [3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12];
      break;
    case ButtonDirection.DOWN:
      indexOrder = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
      break;
    case ButtonDirection.UP:
      indexOrder = [12, 8, 4, 0, 13, 9, 5, 1, 14, 10, 6, 2, 15, 11, 7, 3];
      break;
  }
  let temp: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  temp = temp.map((item, index) => {
    return tiles[indexOrder[index]];
  });
  const result = [
    temp.slice(0, 4),
    temp.slice(4, 8),
    temp.slice(8, 12),
    temp.slice(12, 16)
  ];
  return result;
};

export const convertGroupToTiles = (
  direction: ButtonDirection,
  groups: Array<Array<number>>
): Array<number> => {
  let indexOrder: Array<number> = [];
  switch (direction) {
    case ButtonDirection.RIGHT:
      indexOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
      break;
    case ButtonDirection.LEFT:
      indexOrder = [3, 2, 1, 0, 7, 6, 5, 4, 11, 10, 9, 8, 15, 14, 13, 12];
      break;
    case ButtonDirection.DOWN:
      indexOrder = [0, 4, 8, 12, 1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15];
      break;
    case ButtonDirection.UP:
      indexOrder = [3, 7, 11, 15, 2, 6, 10, 14, 1, 5, 9, 13, 0, 4, 8, 12];
      break;
  }
  let concatenated: Array<number> = [];
  groups.forEach((item) => {
    concatenated = concatenated.concat(item);
  });
  let result: Array<number> = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  result = result.map((item, index) => {
    return concatenated[indexOrder[index]];
  });
  return result;
};

export const processTiles = (
  direction: ButtonDirection,
  tiles: Array<number>
): Array<number> => {
  const groupedLines = getGroupLines(direction, tiles);
  const processed = groupedLines.map((item) => {
    return processTileLine(item);
  });
  const result = convertGroupToTiles(direction, processed);
  return result;
};

export const getEmptyTiles = (tiles: Array<number>): Array<number> => {
  const result: Array<number> = [];
  tiles.forEach((item, index) => {
    if (item == 0) {
      result.push(index);
    }
  });
  return result;
};

export const chooseRandomIndex = (emptyTilesIndices: Array<number>): number => {
  return emptyTilesIndices[
    Math.floor(Math.random() * emptyTilesIndices.length)
  ];
};

export const isTileValuesSame = (
  array1: Array<number>,
  array2: Array<number>
) => {
  if (array1.length != array2.length) {
    return false;
  }
  let result = true;
  for (let i in array1) {
    if (array1[i] != array2[i]) {
      result = false;
    }
  }
  return result;
};

export const isGameWon = (tiles: Array<number>): boolean => {
  return tiles.indexOf(2048) > 0;
};

export const isGameLost = (tiles: Array<number>): boolean => {
  return tiles.indexOf(0) < 0;
};
