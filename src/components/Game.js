import { useState, useEffect, useRef } from "react";
import Card from "./Card";
import GameHistory from "./GameHistory";
import GameModal from "./Modal";

import {
  cardImages2x2,
  cardImages4x4,
  cardImages6x6,
  cardImages8x8,
} from "../assets/images/Images";

const MemoryBoard = () => {
  const [card, setCard] = useState([]);
  const [players, setPlayers] = useState([]);
  const [moves, setMoves] = useState(0);
  const [level, setLevel] = useState(1);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [matchedCards, setMatchedCards] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [message, setMessage] = useState(true);
  const [history, setHistory] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [gridTemplate, setGridTemplate] = useState("repeat(2,1fr)");
  const [cardGrid, setCardGrid] = useState("");
  const [columns, setColumns] = useState();
  const counter = useRef(0);

  let time = new Date();
  const endGameTime = `${time.getDay()}.${time.getMonth()}.${time.getFullYear()}  ${time.getHours()}:${time.getMinutes()} `;

  useEffect(() => {
    shuffleFunction();
  }, []);

  useEffect(() => {
    let arr = [];
    for (let i = 1; i <= 10; i++) {
      arr.push({
        id: i,
        player: "unknown",
        finishedGame: "",
        turnNumber: 0,
        rank: i,
        isPlayer: false,
      });
    }
    setPlayers([...arr]);
  }, [counter]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCard(prevCard => {
          return prevCard.map(index => {
            if (index.src === choiceOne.src) {
              setMatchedCards([...matchedCards, choiceOne, choiceTwo]);
              return { ...index, matching: true };
            } else {
              return index;
            }
          });
        });
        resetCard();
      } else {
        setTimeout(() => resetCard(), 1000);
      }
    }
  }, [choiceOne, choiceTwo, matchedCards, card]);

  useEffect(() => {
    if (matchedCards.length === 4) {
      setTimeout(() => {
        const ShuffledImages4x4 = [...cardImages4x4, ...cardImages4x4]
          .sort(() => Math.random() - 0.5)
          .map(index => ({ ...index, id: Math.random() * 100 }));
        setCard(ShuffledImages4x4);
        setLevel(level => level + 1);
        setGridTemplate("repeat(4,1fr)");
        setColumns(4);
      }, 1000);
      console.log(matchedCards.length);
    }
    if (matchedCards.length === 20) {
      setTimeout(() => {
        const ShuffledImages6x6 = [...cardImages6x6, ...cardImages6x6]
          .sort(() => Math.random() - 0.5)
          .map(index => ({ ...index, id: Math.random() * 100 }));
        setCard(ShuffledImages6x6);
        setLevel(level => level + 1);
        setGridTemplate("repeat(6,1fr)");
        setCardGrid("35%");
        setColumns(6);
      }, 1000);
    }
    if (matchedCards.length === 56) {
      setTimeout(() => {
        const ShuffledImages8x8 = [...cardImages8x8, ...cardImages8x8]
          .sort(() => Math.random() - 0.5)
          .map(index => ({ ...index, id: Math.random() * 100 }));
        setCard(ShuffledImages8x8);
        setLevel(level => level + 1);
        setGridTemplate("repeat(8,1fr)");
        setCardGrid("35%");
        setColumns(8);
      }, 1000);
    }
    if (matchedCards.length === 120) {
      setTimeout(() => {
        setMessage(false);
        setShowModal(true);
      }, 800);
    }
  }, [matchedCards]);

  const shuffleFunction = () => {
    const ShuffledImages = [...cardImages2x2, ...cardImages2x2]
      .sort(() => Math.random() - 0.5)
      .map(index => ({ ...index, id: Math.random() }));
    setCard(ShuffledImages);
    setMoves(0);
    setCardGrid("40%");
    setColumns(2);
  };

  const resetCard = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves(prevTurn => prevTurn++);
    setDisabled(false);
  };

  const handleCardClick = card => {
    if (disabled) return;
    if (!choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  const gameHandler = () => {
    const ShuffledImages2x2 = [...cardImages2x2, ...cardImages2x2]
      .sort(() => Math.random() - 0.5)
      .map(index => ({ ...index, id: Math.random() * 10 }));
    setCard(ShuffledImages2x2);
    setGridTemplate("repeat(2,1fr)");
    setColumns(2);
    setLevel(0);
    setMoves(0);
    setMessage(true);
    matchedCards.length = 0;
  };

  return (
    <div className="Container">
      <h1 className="title">MEMORY GAME</h1>
      <div className="board-container">
        {!message && (
          <div className="button-container">
            <button className="gameButton" onClick={gameHandler}>
              Start new game
            </button>
          </div>
        )}
        <div className="header-container">
          <h3>
            Moves:<span>{moves}</span>
          </h3>

          <h3>
            Level:<span>{level}</span>
          </h3>
        </div>

        <div
          className={`grid grid-columns-${columns}`}
          style={{
            gridTemplateColumns: gridTemplate,
          }}
        >
          {card.map(card => (
            <Card
              card={card}
              moves={moves}
              setMoves={setMoves}
              handleCardClick={handleCardClick}
              columns={columns}
              disabled={disabled}
              isflipped={
                card === choiceOne || card === choiceTwo || card.matching
              }
            />
          ))}
          <GameModal
            setMessage={setMessage}
            setHistory={setHistory}
            setCardGrid={setCardGrid}
            cardGrid={cardGrid}
            matchedCards={matchedCards}
            moves={moves}
            endGameTime={endGameTime}
            players={players}
            setPlayers={setPlayers}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        </div>

        {!message && (
          <h3 className="congrats-message">
            Congratulations,You found all matches in just {moves} moves!
          </h3>
        )}
      </div>
      <GameHistory history={history} players={players} />
    </div>
  );
};

export default MemoryBoard;
