'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MathGame({ params }) {
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    fetch('/math-formulas.json')
      .then((res) => res.json())
      .then((data) => {
        setProblems(data[params.classNum]);
        getRandomProblem(data[params.classNum]);
      });
  }, [params.classNum]);

  useEffect(() => {
    let timerId;
    if (currentProblem && timeLeft > 0) {
      timerId = setTimeout(() => {
        setTimeLeft(prevTime => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
    }
    return () => clearTimeout(timerId);
  }, [currentProblem, timeLeft]);

  const getRandomProblem = (problemSet) => {
    const randomIndex = Math.floor(Math.random() * problemSet.length);
    setCurrentProblem(problemSet[randomIndex]);
    setShowAnswer(false);
    setTimeLeft(30);
    setIsTimeUp(false);
  };

  return (
    <main className={`flex min-h-screen flex-col items-center justify-center p-24 transition-colors duration-300 ${isTimeUp ? 'bg-red-100' : ''}`}>
      <h1 className="text-4xl font-bold mb-8">Matematički šah - {params.classNum}. Razred</h1>
      {currentProblem && (
        <div className="text-center">
          <p className="text-3xl mb-4">{currentProblem.question}</p>
          <p className={`text-3xl bold mb-4 ${timeLeft <= 10 ? 'text-red-500' : ''}`}>
            {timeLeft}
          </p>
          {showAnswer && <p className="text-3xl mb-4">Rješenje: {currentProblem.answer}</p>}
          <div className="flex  justify-center space-x-4 mt-8">
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-black text-white py-2 px-4 rounded-md text-lg hover:bg-gray-800 transition-colors"
              disabled={isTimeUp}
            >
              Pokaži rješenje
            </button>
            <button
              onClick={() => getRandomProblem(problems)}
              className="bg-black text-white py-2 px-4 rounded-md text-lg hover:bg-gray-800 transition-colors"
            >
              Idući zadatak
            </button>
          </div>
        </div>
      )}
      {isTimeUp && (
        <p className="text-2xl mt-4 text-red-500 font-bold">Vrijeme je isteklo!</p>
      )}
      <Link href="/select-class" className="mt-8 text-lg underline">
        Odabir razreda
      </Link>
    </main>
  );
}

