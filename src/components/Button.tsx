import React from "react";
import styles from "./Button.module.css";
import { ButtonDirection, GameState } from "./AppTypes";
import {
  directionStyles,
  processTiles,
  isTileValuesSame,
  getEmptyTiles,
  chooseRandomIndex,
  isGameWon,
  isGameLost
} from "./Util";
import { connect } from "react-redux";
import { updateTiles } from "./AppActions";

const getStyles = (direction: ButtonDirection): string => {
  const classNames = `${styles.button} ${styles[directionStyles[direction]]}`;
  return classNames;
};

export const onButtonPressed = (
  direction: ButtonDirection,
  tiles: Array<number>,
  updateTiles: any
) => {
  const newTiles = processTiles(direction, tiles);

  let gameState = GameState.ONGOING;
  if (isGameWon(newTiles)) {
    gameState = GameState.GAMEWINNER;
  }

  if (isTileValuesSame(tiles, newTiles)) {
    if (isGameLost(newTiles)) {
      gameState = GameState.GAMEOVER;
    } else {
      return;
    }
  } else {
    const emptyTiles = getEmptyTiles(newTiles);
    const additionalTileIndex = chooseRandomIndex(emptyTiles);
    newTiles[additionalTileIndex] = 2;
  }
  updateTiles(newTiles, gameState);
};

export const Button = (
  { direction, tiles, updateTiles }: any = {
    direction: ButtonDirection.UP,
    tiles: [],
    updateTiles: {}
  }
) => {
  return (
    <button
      data-testid="button"
      className={getStyles(direction)}
      style={{
        backgroundImage: `url("${process.env.PUBLIC_URL}/bluetriangle-up.svg")`
      }}
      onClick={() => onButtonPressed(direction, tiles, updateTiles)}
    ></button>
  );
};

const mapStateToProps = (state: any, ownProps: any) => {
  return {
    direction: ownProps.direction,
    tiles: state.appReducer.tiles
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    updateTiles: (tiles: Array<number>, gameState: GameState) => {
      dispatch(updateTiles(tiles, gameState));
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Button);
