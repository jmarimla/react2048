import React from "react";
import styles from "./TileRow.module.css";
import Tile from "./Tile";

interface TileRowProps {
  tiles: Array<number>;
}

const TileRow = ({ tiles }: TileRowProps) => {
  return (
    <div data-testid="tile-row" className={styles.tileRow}>
      {tiles.map((value, index) => {
        return <Tile key={index} tileValue={value} />;
      })}
    </div>
  );
};

export default TileRow;
