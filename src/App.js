import React, { useState, useEffect } from 'react';
import Die from './Die';
import './style.css';
import {nanoid} from 'nanoid';
import Confetti from 'react-confetti';

function App() {

  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(0);
  const [highScore, setHighScore] = useState(0);

  useEffect(() => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
    }
  }, [dice])

  useEffect(() => {
    if (rolls > 0 && rolls < highScore) {
      setHighScore(rolls);
    } else if (rolls > 0 && highScore === 0) {
      setHighScore(rolls);
    }
    console.log('setting')
  }, [tenzies])

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

  function rollDice() {
    if(!tenzies) {
      setRolls(prev => prev + 1)
      setDice(oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die : generateNewDie()
      }))
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(0);
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }

  const diceElements = dice.map(die => (
    <Die 
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ))



  return (
    <main>
      {tenzies && <Confetti height={'440px'} width={'800px'}/>}
      <h1 className="title">Tenzies</h1>
      <p className='instructions'>Roll until all dice are the same. 
        Click each die to freeze it at its current value between rolls.</p>
        <div className='dice-container'>
          {diceElements}
        </div>
        <button 
          className='roll-dice'
          onClick={rollDice}
        >
          {tenzies ? 'New Game' : 'Roll'}
        </button>
        <div className="score-keeper">Current score: {rolls}</div>
        <div className="score-keeper">Best score: {highScore}</div>
    </main>
  );
}

export default App;