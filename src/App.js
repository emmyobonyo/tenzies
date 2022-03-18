import React from 'react'
import Dice from './components/Dice';
import './App.css';

function App() {
  const [dice, setDice] = React.useState(allNewDice()); // using function to initialise state
  function allNewDice() {
    const newDice = []
    for(let i = 0; i<10; i++){
      newDice.push(Math.ceil(Math.random() * 6)) //it's a function so it ought to run immediately
    }
    return newDice
  }

  const diceElements = dice.map(die => <Dice value={die}/>)

  return (
    <div className="App">
        <main>
          <div className="dice-container">
            {diceElements}
          </div>
        </main>
    </div>
  );
}

export default App;
