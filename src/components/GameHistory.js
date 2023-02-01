import React from "react";

function HistoryOfGames({ players, history }) {
  return (
    <div className="history-container" hidden={history}>
      <h3>TOP 10 PLAYERS:</h3>
      <table className="history-table">
        <tbody className="history-body">
          {players.map(index => (
            <tr key={index.id}>
              <td>
                <span>{index.rank}</span>
              </td>
              <td>
                <span>{index.player}</span>
              </td>
              <td>
                <span>{index.NumOfTurns}</span>
              </td>
              <td>
                <span>{index.finishedgame}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
export default HistoryOfGames;
