import React from "react";
import Die from "./components/Die";

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  //function to create random 10 digit number in an array
  function allNewDice() {
    const newArr = [];
    for (let i = 0; i < 10; i++) {
      newArr.push(Math.ceil(Math.random() * 6));
    }
    return newArr;
  }
  const diceElement = dice.map((die) => {
    return <Die value={die} />;
  });

  function onRoll() {
    setDice(allNewDice);
  }
  return (
    <main>
      <div className="dice-container">
        {diceElement}
        <button onClick={onRoll}>Roll</button>
      </div>
    </main>
  );
}

export default App;
