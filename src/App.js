import { nanoid } from "nanoid";
import React from "react";
import Confetti from "react-confetti";
import Die from "./components/Die";

function App() {
  //! State
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  const [count, setCount] = React.useState(0);
  const [message, setMessage] = React.useState("Come-on!");

  //! UseEffect
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setMessage("Congrats! You Did It!!");
      setTenzies(true);
    }
  }, [dice]);

  function generateRandomNumber() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }
  //function to create random 10 digit number in an array
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateRandomNumber());
    }

    return newDice;
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElement = dice.map((die) => {
    return (
      <Die
        key={die.id}
        value={die.value}
        isHeld={die.isHeld}
        holdDice={() => holdDice(die.id)}
      />
    );
  });

  function rollDice() {
    setCount((prevCount) => prevCount + 1);
    // setDice(allNewDice);
    if (!tenzies) {
      setDice((oldDIce) =>
        oldDIce.map((die) => {
          return die.isHeld ? die : generateRandomNumber();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setCount(0);
    }
  }
  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="title">Tenzies</h1>
      <h3>
        Total Roll{count > 1 ? "s" : ""} - {count}
      </h3>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <p>{count ? message : ""}</p>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
