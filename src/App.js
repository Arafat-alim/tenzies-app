import { nanoid } from "nanoid";
import React from "react";
import Die from "./components/Die";

function App() {
  //! State
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);

  //! UseEffect
  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      console.log("you won");
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
    // setDice(allNewDice);
    setDice((oldDIce) =>
      oldDIce.map((die) => {
        return die.isHeld ? die : generateRandomNumber();
      })
    );
  }
  return (
    <main>
      {/* {tenzies && } */}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElement}</div>
      <button onClick={rollDice} className="roll-dice">
        {tenzies ? "Reset" : "Roll"}
      </button>
    </main>
  );
}

export default App;
