import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Modal() {
  const [player, setPlayer] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    localStorage.setItem("Player", JSON.stringify(player));
  }, [player]);

  const handleOk = e => {
    e.preventDefault();
    if (player === "") {
      setDisabled(true);
    } else {
      setDisabled(false);
      navigate("/");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };
  return (
    <div>
      {!showModal && (
        <div className="modal">
          <div className="modal-content">
            <button className="close" onClick={handleCancel}>
              &times;
            </button>
            <h2>Memory Game</h2>
            <h3>
              Well done! You are in the top 10 now! Please add your name here:
            </h3>
            <input
              required
              placeholder="Player's name"
              type="text"
              value={player}
              onChange={e => setPlayer(e.target.value)}
            />
            <div>
              <button
                className="Ok-button"
                disabled={disabled}
                type="submit"
                onClick={handleOk}
              >
                OK
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                CANCEL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Modal;
