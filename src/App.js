import React from 'react'
import Dice from './components/Dice';
import {nanoid} from 'nanoid';
import './App.css';

function App() {
  const [dice, setDice] = React.useState(allNewDice()); // using function to initialise state
  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
        newDice.push({
            id: nanoid(),
            value: Math.ceil(Math.random() * 6),
            isHeld: false 
        })
    }
    return newDice
  }

  function rollDice() {
    return setDice(dice => dice.map(die => {
      return die.isHeld == true ? die : {...die, value: Math.ceil(Math.random() * 6)}
    }))
}

  function holdDice(id){
     return setDice(dice => dice.map(die => {
      return die.id === id ? { ...die, isHeld: !die.isHeld} : die
    }))
  }

  const diceElements = dice.map(die => (<Dice key={die.id} id={die.id} value={die.value} held={die.isHeld} holdDice={() => holdDice(die.id)}/>))

  return (
    <div className="App">
        <main>
          <div className="dice-container">
            {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>Roll</button>
        </main>
    </div>
  );
}

export default App;
