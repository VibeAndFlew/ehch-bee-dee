import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react';

export default function Home() {
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(generateRandomNumber());
  const [message, setMessage] = useState('');

  function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }

  function handleGuess() {
    const userGuess = parseInt(guess);

    if (userGuess === targetNumber) {
      setMessage('Congratulations! You guessed the number!');
      setTargetNumber(generateRandomNumber());
    } else if (userGuess < targetNumber) {
      setMessage('Try a higher number.');
    } else {
      setMessage('Try a lower number.');
    }
  }

  return (
    <div className="container">
      <Head>
        <title>HAPPY BIRTHDAY TAIYA ❤️</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Happy Birthday, Taiya! 🎉❤️ Get started by editing hehe <code>pages/index.js</code>
        </p>

        <h2>Guess the Number Game</h2>
        <p>Can you guess the random number between 1 and 100?</p>
        <input
          type="number"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
        <p>{message}</p>
      </main>

      <Footer />
    </div>
  )
}
