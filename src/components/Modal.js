import Modal from "react-bootstrap/Modal";
import { useState } from "react";

function GameModal({
  setHistory,
  setMessage,
  matchedCards,
  setCardGrid,
  moves,
  endGameTime,
  setPlayers,
  players,
  showModal,
  setShowModal,
}) {
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [playerMessage, setPlayerMessage] = useState(true);
  const [input, setInput] = useState([""]);

  const HideModal = i => {
    setShowModal(false);
    setCardGrid("40%");
    setInput([]);
    setHistory(false);
    setMessage(false);

    let CurrentPlayer = {
      id: Math.random() * 100,
      player: input,
      finishedGame: endGameTime,
      turnNumber: moves,
      isPlayer: true,
    };

    players.push(CurrentPlayer);

    let RealPlayers = players.filter(a => {
      return a.isPlayer;
    });

    RealPlayers.sort((a, b) => a.NumOfTurns - b.NumOfTurns);

    let copyOfDefaultPlayer = players.filter(a => {
      return a.player === "unknown";
    });

    let ListOfPlayers = [...RealPlayers, ...copyOfDefaultPlayer];
    while (ListOfPlayers.length > 10) {
      ListOfPlayers.pop();
    }

    for (let i = 0; i < ListOfPlayers.length; i++) {
      ListOfPlayers[i].rank = i + 1;
    }

    setPlayers(ListOfPlayers);
    localStorage.setItem("player", JSON.stringify(ListOfPlayers));
    matchedCards.length = 0;
  };

  const changeHandler = e => {
    setInput(e.target.value);
    if (input.length !== 0) {
      setButtonDisabled(false);
      setPlayerMessage(true);
    }
  };
  const clickButton = () => {
    console.log("click");
    setShowModal(false);
  };
  return (
    <>
      <Modal
        className="modal-container"
        show={showModal}
        onHide={HideModal}
        backdrop="static"
        centered
      >
        <div className="modal-title">
          <h3>Well done.You're in top 10</h3>
          <h3>Please add your name:</h3>
        </div>
        <Modal.Body>
          <div className="modal-body">
            <input
              value={input}
              type="text"
              className="modal-input"
              placeholder="Players name"
              onChange={changeHandler}
            />
            <h4 hidden={playerMessage}>Please enter your name </h4>
            <div className="modal-buttons">
              <button
                id="okId"
                className="ok-button"
                disabled={buttonDisabled}
                onClick={HideModal}
              >
                OK
              </button>
              <button
                id="cancelId"
                className="cancel-button"
                onClick={clickButton}
              >
                CANCEL
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default GameModal;
