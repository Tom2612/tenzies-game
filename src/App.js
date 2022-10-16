import React, { useState, useEffect } from 'react';
import Die from './Die';
import './style.css';
import {nanoid} from 'nanoid';

function App() {

  const [dice, setDice] = useState(allNewDice())

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDie())
    }
    return newDice;
  }

  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      // holdDice={() => holdDice(die.id)}
    />
  ))

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button className='roll-dice'>Roll</button>
    </main>
  );
}

export default App;