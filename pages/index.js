import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import { useState } from 'react';

export default function Home() {
  const [guess, setGuess] = useState('');
  const [birthdate, setBirthdate] = useState('1998-14-10'); // The target birthdate
  const [message, setMessage] = useState('');

  function handleGuess() {
    if (guess === birthdate) {
      setMessage('Congratulations! You guessed the birthdate! 🎉');
    } else {
      setMessage('Nope, try again! 😄');
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

        <h2>Annoying Birthdate Guessing Game</h2>
        <p>Can you guess the birthdate?</p>
        <input
          type="date"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
        />
        <button onClick={handleGuess}>Guess</button>
        <p className={`animated-text ${guess === birthdate ? 'wiggle' : ''}`}>{message}</p>
      </main>

      <Footer />
      <style jsx>{`
        .wiggle {
          animation: wiggle 0.5s ease infinite;
        }

        @keyframes wiggle {
          0% { transform: rotate(-5deg); }
          50% { transform: rotate(5deg); }
          100% { transform: rotate(-5deg); }
        }
      `}</style>
    </div>
  )
}