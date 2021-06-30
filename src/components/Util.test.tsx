import { directionStyles, TOTAL_ROWS, TOTAL_TILES_PER_ROW } from "./Util";
import {
  getRandomIndex,
  processTileLine,
  getGroupLines,
  convertGroupToTiles,
  processTiles,
  getEmptyTiles,
  chooseRandomIndex,
  isTileValuesSame
} from "./Util";
import { ButtonDirection } from "./AppTypes";

describe("Constants", () => {
  it("exist with values", () => {
    const constants = [TOTAL_ROWS, TOTAL_TILES_PER_ROW];
    constants.forEach((item, index) => {
      expect(item).toBeTruthy();
    });
  });
});

describe("getRandomIndex", () => {
  it("returns a random value", () => {
    for (let i = 0; i < 100; i++) {
      const output = getRandomIndex();
      expect(Number.isInteger(output)).toBeTruthy();
      expect(output).toBeLessThan(TOTAL_ROWS * TOTAL_TILES_PER_ROW);
    }
  });
});

describe("processTileLine", () => {
  it("returns flattened array", () => {
    //no action
    expect(processTileLine([0, 0, 0, 0])).toMatchObject([0, 0, 0, 0]);
    expect(processTileLine([0, 0, 2, 4])).toMatchObject([0, 0, 2, 4]);
    expect(processTileLine([2, 4, 8, 16])).toMatchObject([2, 4, 8, 16]);
    //push to the right
    expect(processTileLine([2, 0, 0, 0])).toMatchObject([0, 0, 0, 2]);
    expect(processTileLine([2, 4, 0, 0])).toMatchObject([0, 0, 2, 4]);
    expect(processTileLine([2, 0, 0, 4])).toMatchObject([0, 0, 2, 4]);
    //merge similar values
    expect(processTileLine([2, 0, 0, 2])).toMatchObject([0, 0, 0, 4]);
    expect(processTileLine([0, 2, 2, 0])).toMatchObject([0, 0, 0, 4]);
    expect(processTileLine([2, 2, 4, 4])).toMatchObject([0, 0, 4, 8]);
  });
});

describe("getGroupLines", () => {
  it("returns correct groups", () => {
    //prettier-ignore
    const inputTiles = [
      0, 1, 2, 3,
      4, 5, 6, 7, 
      8, 9, 10, 11, 
      12, 13, 14, 15
    ];
    expect(getGroupLines(ButtonDirection.RIGHT, inputTiles)).toMatchObject([
      [0, 1, 2, 3],
      [4, 5, 6, 7],
      [8, 9, 10, 11],
      [12, 13, 14, 15]
    ]);
    expect(getGroupLines(ButtonDirection.LEFT, inputTiles)).toMatchObject([
      [3, 2, 1, 0],
      [7, 6, 5, 4],
      [11, 10, 9, 8],
      [15, 14, 13, 12]
    ]);
    expect(getGroupLines(ButtonDirection.DOWN, inputTiles)).toMatchObject([
      [0, 4, 8, 12],
      [1, 5, 9, 13],
      [2, 6, 10, 14],
      [3, 7, 11, 15]
    ]);
    expect(getGroupLines(ButtonDirection.UP, inputTiles)).toMatchObject([
      [12, 8, 4, 0],
      [13, 9, 5, 1],
      [14, 10, 6, 2],
      [15, 11, 7, 3]
    ]);
  });
});

describe("convertGroupsToTiles", () => {
  it("returns correct tiles", () => {
    //prettier-ignore
    const outputTiles = [
      0, 1, 2, 3,
      4, 5, 6, 7, 
      8, 9, 10, 11, 
      12, 13, 14, 15
    ];
    expect(
      convertGroupToTiles(ButtonDirection.RIGHT, [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
      ])
    ).toMatchObject(outputTiles);
    expect(
      convertGroupToTiles(ButtonDirection.LEFT, [
        [3, 2, 1, 0],
        [7, 6, 5, 4],
        [11, 10, 9, 8],
        [15, 14, 13, 12]
      ])
    ).toMatchObject(outputTiles);
    expect(
      convertGroupToTiles(ButtonDirection.DOWN, [
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15]
      ])
    ).toMatchObject(outputTiles);
    expect(
      convertGroupToTiles(ButtonDirection.UP, [
        [12, 8, 4, 0],
        [13, 9, 5, 1],
        [14, 10, 6, 2],
        [15, 11, 7, 3]
      ])
    ).toMatchObject(outputTiles);
  });
});

describe("processTiles", () => {
  it("returns correct array", () => {
    //prettier-ignore
    const testArray = [
      {
        direction: ButtonDirection.RIGHT,
        inputTiles:
          [
            0, 0, 0, 0,
            0, 0, 0, 0, 
            0, 0, 0, 0,
            0, 0, 0, 0
          ],
        outputTiles:
          [
            0, 0, 0, 0,
            0, 0, 0, 0, 
            0, 0, 0, 0,
            0, 0, 0, 0
          ]
      },
      {
        direction: ButtonDirection.RIGHT,
        inputTiles:
          [
            0, 0, 0, 2,
            0, 2, 4, 0, 
            2, 2, 4, 0,
            2, 2, 4, 4
          ],
        outputTiles:
          [
            0, 0, 0, 2,
            0, 0, 2, 4, 
            0, 0, 4, 4,
            0, 0, 4, 8
          ]
      },
      {
        direction: ButtonDirection.LEFT,
        inputTiles:
          [
            0, 0, 0, 2,
            0, 2, 4, 0, 
            2, 2, 4, 0,
            2, 2, 4, 4
          ],
        outputTiles:
          [
            2, 0, 0, 0,
            2, 4, 0, 0, 
            4, 4, 0, 0,
            4, 8, 0, 0
          ]
      },
      {
        direction: ButtonDirection.UP,
        inputTiles:
          [
            0, 0, 0, 2,
            0, 2, 4, 0, 
            2, 2, 4, 0,
            2, 2, 4, 4
          ],
        outputTiles:
          [
            4, 4, 8, 2,
            0, 2, 4, 4, 
            0, 0, 0, 0,
            0, 0, 0, 0
          ]
      },
      {
        direction: ButtonDirection.DOWN,
        inputTiles:
          [
            0, 0, 0, 2,
            0, 2, 4, 0, 
            2, 2, 4, 0,
            2, 2, 4, 4
          ],
        outputTiles:
          [
            0, 0, 0, 0,
            0, 0, 0, 0, 
            0, 2, 4, 2,
            4, 4, 8, 4
          ]
      }
    ];
    testArray.forEach((item, index) => {
      expect(processTiles(item.direction, item.inputTiles)).toMatchObject(
        item.outputTiles
      );
    });
  });
});

describe("getEmptyTiles", () => {
  it("returns correct array", () => {
    const inputTiles = [0, 2, 4, 8, 0, 2, 4, 8, 0, 2, 4, 8, 0, 2, 4, 8];
    expect(getEmptyTiles(inputTiles)).toMatchObject([0, 4, 8, 12]);
  });
});

describe("chooseRandomIndex", () => {
  it("returns correct number", () => {
    const inputTiles = [0, 2, 8, 10, 12, 14];
    for (let i = 0; i < 100; i++) {
      const randomIndex = chooseRandomIndex(inputTiles);
      expect(inputTiles.indexOf(randomIndex)).toBeGreaterThan(-1);
    }
  });
});

describe("isTileValuesSame", () => {
  it("returns correct boolean", () => {
    const array1 = [1, 2, 3, 4];
    const array2 = [1, 2, 3, 4];
    expect(isTileValuesSame(array1, array2)).toBeTruthy();
    const array3 = [1, 2, 3, 4];
    const array4 = [1, 2, 4, 4];
    expect(isTileValuesSame(array3, array4)).toBeFalsy();
    const array5 = [1, 2, 3, 4];
    const array6 = [1, 2, 3];
    expect(isTileValuesSame(array5, array6)).toBeFalsy();
  });
});
