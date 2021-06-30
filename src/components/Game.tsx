import React, { useEffect } from "react";
import styles from "./Game.module.css";
import { connect } from "react-redux";
import Button from "./Button";
import { ButtonDirection, GameState } from "./AppTypes";
import { TOTAL_ROWS, TOTAL_TILES_PER_ROW } from "./Util";
import TileRow from "./TileRow";
import { createTile, restartGame } from "./AppActions";
import { getRandomIndex } from "./Util";

const getGameBoard = (tiles: Array<number>) => {
  const rowTiles = [];
  for (let i = 0; i < TOTAL_ROWS; i++) {
    let x = tiles.slice(
      i * TOTAL_TILES_PER_ROW,
      i * TOTAL_TILES_PER_ROW + TOTAL_TILES_PER_ROW
    );
    rowTiles.push(x);
  }

  const content = rowTiles.map((item, index) => {
    return <TileRow key={index} tiles={item} />;
  });

  return (
    <div data-testid="game-board" className={styles.gameBoard}>
      {content}
    </div>
  );
};

export const Game = ({
  tiles,
  gameState,
  createInitialTile,
  restartGame
}: any) => {
  useEffect(() => {
    if (gameState == GameState.GAMEWINNER) {
      alert("Congratulations! You won!");
      restartGame();
    } else if (gameState == GameState.GAMEOVER) {
      alert("Game Over");
      restartGame();
    } else if (gameState == GameState.START) {
      createInitialTile();
    }
  }, [gameState]);

  return (
    <>
      <div data-testid="game" className={styles.game}>
        {getGameBoard(tiles)}
        <div data-testid="controls" className={styles.controls}>
          <div className={styles.controls1}>
            <Button direction={ButtonDirection.LEFT} />
          </div>
          <div className={styles.controls2}>
            <Button direction={ButtonDirection.UP} />
            <Button direction={ButtonDirection.DOWN} />
          </div>
          <div className={styles.controls3}>
            <Button direction={ButtonDirection.RIGHT} />
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state: any) => {
  return {
    tiles: state.appReducer.tiles,
    gameState: state.appReducer.gameState
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    createInitialTile: () => {
      const index = getRandomIndex();
      dispatch(createTile({ index: index, value: 2 }));
    },
    restartGame: () => {
      dispatch(restartGame());
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Game);
