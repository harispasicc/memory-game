import React from "react";
import cover from "../assets/images/cover.jpg";
import classnames from "classnames";

function Card({ card, index, isInactive, isFlipped, onClick, isDisabled }) {
  const handleClick = () => {
    !isFlipped && !isDisabled && onClick(index);
  };

  return (
    <div>
      <div
        className={classnames("card", {
          "is-flipped": isFlipped,
          "is-inactive": isInactive,
        })}
        onClick={handleClick}
      >
        <div className="card-face card-font-face">
          <img src={cover} alt="backpic" className="img" />
        </div>
        <div className="card-face card-back-face">
          <img src={card.image} alt="frontpic" className="img" />
        </div>
      </div>
    </div>
  );
}

export default Card;
