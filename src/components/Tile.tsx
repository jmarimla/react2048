import React from "react";
import styles from "./Tile.module.css";

const getTileClass = (tileValue: number) => {
  return tileValue ? styles.tileFilled : styles.tileEmpty;
};

const Tile = ({ tileValue = 0 }) => {
  return (
    <div
      data-testid="tile"
      className={`${styles.tile} ${getTileClass(tileValue)}`}
    >
      <div>{tileValue ? tileValue : ""}</div>
    </div>
  );
};

export { getTileClass };
export default Tile;
