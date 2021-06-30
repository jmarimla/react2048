import React from "react";
import styles from "./App.module.css";
import Game from "./components/Game";

function App() {
  return (
    <div className={styles.app}>
      <header className={styles.appHeader}>
        <div className={styles.appHeader_content}>
          <div className={styles.appHeader_title}>2048</div>
          <div className={styles.appHeader_subtitle}>
            A React implementation of the game
          </div>
        </div>
      </header>
      <section className={styles.appGame}>
        <Game />
      </section>
    </div>
  );
}

export default App;
