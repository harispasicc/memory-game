import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Card from "./components/Card";

const cardImages = [
  { "src": "/images/android.png", matched: false },
  { "src": "/images/angular.png", matched: false },
{ "src": "/images/css.png", matched: false },
{ "src": "/images/docker.png", matched: false },
{ "src": "/images/drupal.png", matched: false }, 
{ "src": "/images/git.png", matched: false },
 { "src": "/images/c#.png",matched: false  },
  { "src": "/images/github.png", matched: false  },
  { "src": "/images/go.png", matched: false  },
  { "src": "/images/heroku.png", matched: false  },
  { "src": "/images/html.png",matched: false  },
  { "src": "/images/java.png", matched: false  },
  { "src": "/images/javascript.png", matched: false  },
  { "src": "/images/linux.png", matched: false  },
  { "src": "/images/mocha.png", matched: false  },
  { "src": "/images/mongo.png", matched: false  },
  { "src": "/images/msteams.png", matched: false  },
  { "src": "/images/mysql.png", matched: false  },
  { "src": "/images/node.png", matched: false  },
  { "src": "/images/paragon.png", matched: false  },
  { "src": "/images/postgresql.png", matched: false  },
  { "src": "/images/postman.png", matched: false  },
  { "src": "/images/python.png", matched: false  },
  { "src": "/images/rail.png", matched: false  },
  { "src": "/images/react.png", matched: false  },
  { "src": "/images/scala.png", matched: false  },
  { "src": "/images/slack.png", matched: false  },
  { "src": "/images/swift.png", matched: false  },
  { "src": "/images/typescript.png", matched: false  },
  { "src": "/images/unity.png", matched: false  },
  { "src": "/images/visualstudio.png", matched: false  },
  { "src": "/images/vue.png", matched: false  },
];



function App() {
  const [cards, setCrads] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [level, setLevel] = useState(1)

  //shuffle cards
  const shuffleCards = () => {
    const shuffleCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map(card => ({ ...card, id: Math.random() }));

      setChoiceOne(null)
      setChoiceTwo(null)
    setCrads(shuffleCards);
    setTurns(0);
  };

  //handleChoice

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //compare 2 selected cards
  useEffect(()=>{
  
    if(choiceOne && choiceTwo){  
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
        setCrads(prevCards => {
          return prevCards.map(card => {
            if(card.src === choiceOne.src){
              return {...card, matched: true}
            }else {
              return card;
            }
          })
        })
        resetTurn()
      }else{
        setTimeout(() => {
           resetTurn()
        }, 1000);
       
      }
    }
  },[choiceOne, choiceTwo])

  const levels = (card) => {
    if(card.matched){
      setLevel(2)
    }
  }


  //reset choice and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }

  //start new game automatically
  useEffect(()=>{
    shuffleCards()
  },[])

  return (
    <div className="App">
      <h1>Memory Game</h1>
      <p>Moves: {turns}</p>
      <p>Level: {level}</p>
      {/* <button onClick={shuffleCards}>START NEW GAME</button> */}
      <div className="card-grid"> 
        {cards.map(card => (
       <Card 
       key={card.id} 
       card={card}
        handleChoice={handleChoice} 
        flipped={card === choiceOne || card === choiceTwo || card.matched }
        disabled={disabled}/>
        ))}
      </div>
    </div>
  );
}

export default App;
