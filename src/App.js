import { nanoid } from "nanoid";
import React from "react";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  //function to create random 10 digit number in an array
  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isheld: false,
        id: nanoid(),
      });
    }

    return newDice;
  }
  const diceElement = dice.map((die) => {
    return <Die key={die.id} value={die.value} />;
  });

  function onRoll() {
    setDice(allNewDice);
  }
  return (
    <main>
      <div className="dice-container">{diceElement}</div>
      <button onClick={onRoll} className="roll-dice">
        Roll
      </button>
    </main>
  );
}

export default App;
