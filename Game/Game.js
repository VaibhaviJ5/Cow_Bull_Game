import React, { useState } from "react";
import "./Game.css";

export const generateRandomNumber = () => {
  let digits = [];
  while (digits.length < 4) {
    const digit = Math.floor(Math.random() * 10);
    if (!digits.includes(digit)) {
      digits.push(digit);
    }
  }
  return digits.join('');
};

const Game = () => {
  const [randomNumber, setRandomNumber] = useState(generateRandomNumber());
  const [guesses, setGuesses] = useState([]);
  const [message, setMessage] = useState('');
  const [guessInput, setGuessInput] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);

  const checkGuess = () => {
    const guess = guessInput;

    if (guess.length !== 4 || !/^\d+$/.test(guess)) {
      setMessage('Invalid guess. Please enter a 4-digit number.');
      return;
    }

    const digitSet = new Set(guess);
    if (digitSet.size !== 4) {
      setMessage('Invalid guess. Please enter a 4-digit number with no repeating digits.');
      return;
    }

    let bulls = 0;
    let cows = 0;
    let remainingRandom = [];
    let remainingGuess = [];

    for (let i = 0; i < 4; i++) {
      if (guess[i] === randomNumber[i]) {
        bulls++;
      } else {
        remainingRandom.push(randomNumber[i]);
        remainingGuess.push(guess[i]);
      }
    }

    for (let i = 0; i < remainingGuess.length; i++) {
      if (remainingRandom.includes(remainingGuess[i])) {
        cows++;
        remainingRandom = remainingRandom.filter(digit => digit !== remainingGuess[i]);
      }
    }

    setGuesses([...guesses, { guess, bulls, cows }]);
    setMessage(`Bulls: ${bulls}, Cows: ${cows}`);

    if (bulls === 4) {
      setMessage('Congratulations! You guessed the number!');
      setIsGameOver(true);
    }
  };

  const startNewGame = () => {
    setRandomNumber(generateRandomNumber());
    setGuesses([]);
    setMessage('');
    setGuessInput('');
    setIsGameOver(false);
  };

  const giveUp = () => {
    setMessage(`The correct number was: ${randomNumber}`);
    setIsGameOver(true);
  };

  return (
    <div className="game">
      <h1>Cows And Bulls Game</h1>
      <p>Try to guess the 4-digit number with no repeating digits!</p>

      <input
        type="text"
        maxLength="4"
        value={guessInput}
        placeholder="Enter your guess"
        onChange={(e) => setGuessInput(e.target.value)}
        disabled={isGameOver}
      />
      <button onClick={checkGuess} disabled={isGameOver}>Submit Guess</button>

      <div className="message">{message}</div>

      <div className="guesses">
        {guesses.map((g, index) => (
          <div key={index}>
            Guess: {g.guess}, Bulls: {g.bulls}, Cows: {g.cows}
          </div>
        ))}
      </div>

      <div className="rules">
        <h2>Rules & Regulations:</h2>
        <ul>
          <li>Guess the 4-digit number.</li>
          <li>Each guess must be exactly 4 digits long.</li>
          <li>Each guess must contain no repeating digits.</li>
          <li>The game will tell you how many digits are Bulls (correct in the correct position) and how many are Cows (correct digits in the wrong position).</li>
          <li>If you guess all 4 digits correctly (4 Bulls), you win!</li>
        </ul>
      </div>

      <button onClick={startNewGame}>New Game</button>
      <button onClick={giveUp} disabled={isGameOver}>Give Up</button>
    </div>
  );
};

export default Game;
