import React from 'react'
import Dice from './components/Dice';
import {nanoid} from 'nanoid';
import Confetti from "react-confetti"
import './App.css';

function App() {
  const [dice, setDice] = React.useState(allNewDice()); // using function to initialise state
  const [tenzies, setTenzies] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld) //every will check every // element in the array
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
        console.log("You won!")
    }
}, [dice])

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
          {tenzies && <Confetti />}
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
          <div className="dice-container">
            {diceElements}
          </div>
          <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    </div>
  );
}

export default App;
