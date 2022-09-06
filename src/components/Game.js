import React, { useEffect, useRef, useState } from "react";
import Card from "./Card";
import EndGame from "./EndGame";
import Header from "./Header";
import cardImages from "./Images";
import { useNavigate } from "react-router-dom";

const swap = (array, i, j) => {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
};

const shuffleCards = array => {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    swap(array, currentIndex, randomIndex);
  }
  return array;
};

function Game() {
  const [cards, setCrads] = useState(() =>
    shuffleCards(cardImages.concat(cardImages))
  );
  const [openCards, setOpenCards] = useState([]); //track fliped card
  const [matchedCards, setMatchedCards] = useState({}); //matched and removed from deck
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [level, setLevel] = useState(1);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );
  const girdSize = [2, 4, 6, 8];

  const timeout = useRef(null);

  const navigate = useNavigate();

  const disable = () => {
    setDisabled(true);
  };

  const enable = () => {
    setDisabled(false);
  };

  const levels = levelArr => {
    levelArr = [...cardImages, ...cardImages.slice(0, girdSize)];
    setCrads(shuffleCards);
    if (level === 4) {
      setLevel(level + 1);
    } else {
      setLevel(level);
    }
  };

  const checkComplete = () => {
    if (Object.keys(matchedCards).length === cardImages.length) {
      const highScore = Math.min(moves, bestScore);
      setBestScore(highScore);
      localStorage.setItem("bestScore", highScore);
      setTimeout(() => {
        navigate("/modal");
      }, 500);
    }
  };

  const evaluate = () => {
    const [first, second] = openCards;
    enable();
    if (cards[first].type === cards[second].type) {
      setMatchedCards(prev => ({
        ...prev,
        [cards[first].type]: true,
      }));
      setOpenCards([]);
      return;
    }
    timeout.current = setTimeout(() => {
      setOpenCards([]);
    }, 500);
  };

  const handleCardClick = index => {
    if (openCards.length === 1) {
      setOpenCards(prev => [...prev, index]);
      setMoves(moves => moves + 1);
      disable();
    } else {
      clearTimeout(timeout.current);
      setOpenCards([index]);
    }
  };

  useEffect(() => {
    let timeout = null;
    if (openCards.length === 2) {
      timeout = setTimeout(evaluate(), 300);
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [openCards]);

  //check compl fun

  useEffect(() => {
    checkComplete();
  }, [matchedCards]);

  //check if card is fliped

  const checkFlipped = index => {
    return openCards.includes(index);
  };

  //if card is inactive
  const checkInactive = card => {
    return Boolean(matchedCards[card.type]);
  };

  const handleRestart = () => {
    setMatchedCards({});
    setOpenCards([]);
    setMoves(0);
    setDisabled(false);
    setCrads(shuffleCards(cardImages.concat(cardImages)));
    setLevel(1);
  };

  return (
    <div>
      <Header
        moves={moves}
        level={level}
        bestScore={bestScore}
        handleRestart={handleRestart}
      />
      <div className="game">
        <div className="card-grid">
          {cards.map((card, index) => (
            <Card
              key={index}
              card={card}
              index={index}
              isDisabled={disabled}
              isInactive={checkInactive(card)}
              isFlipped={checkFlipped(index)}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>
      <EndGame bestScore={bestScore} />
    </div>
  );
}

export default Game;
