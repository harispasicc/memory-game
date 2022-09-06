import React from "react";

function Header({ moves, level, handleRestart }) {
  return (
    <div>
      <div className="header">
        <h1>Memory Game</h1>
        <button className="starButton" onClick={handleRestart}>
          START NEW GAME
        </button>
        <div className="moves-level">
          <span className="moves">Moves:{moves}</span>
          <span className="level">Level:{level}</span>
        </div>
      </div>
    </div>
  );
}

export default Header;
