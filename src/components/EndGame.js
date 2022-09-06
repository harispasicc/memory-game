import React, { useEffect, useState } from "react";
import moment from "moment";

function Finish({ bestScore, showModal }) {
  const [player, setPlayer] = useState([]);
  const [gameHistory, setGameHistory] = useState([]);
  const [date, setDate] = useState("");
  const [gameID, setGameID] = useState("");
  const [newDate, setNewDate] = useState("");

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("Player"));
    if (items) {
      setPlayer(items);
    }
  }, []);

  useEffect(() => {
    setGameID(gameID + 1);
    setDate(newDate);
    setGameHistory([
      ...gameHistory,
      {
        gameId: gameID,
        date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
        player: JSON.parse(localStorage.getItem("Player")),
        bestScore: bestScore,
      },
    ]);
  }, [bestScore]);

  return (
    <div className="end-game">
      <h2>TOP 10 PLAYERS:</h2>
      {gameHistory &&
        gameHistory.map(({ date, player, bestScore }, id) => (
          <ol type="1" key={id}>
            {!bestScore && <li>Unknown 0</li>}
            {bestScore && (
              <li>
                {player} {bestScore} {date}
              </li>
            )}
          </ol>
        ))}
      {showModal && (
        <h3>
          Congratulations, You have found all matches in just {bestScore} moves!
        </h3>
      )}
    </div>
  );
}

export default Finish;
