import { nanoid } from "nanoid";
import React from "react";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
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
      <div className="dice-container">{diceElement}</div>
      <button onClick={rollDice} className="roll-dice">
        Roll
      </button>
    </main>
  );
}

export default App;
