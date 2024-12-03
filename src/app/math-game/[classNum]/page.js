'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function MathGame({ params }) {
  const [problems, setProblems] = useState([]);
  const [currentProblem, setCurrentProblem] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    fetch('/math-formulas.json')
      .then((res) => res.json())
      .then((data) => {
        setProblems(data[params.classNum]);
        getRandomProblem(data[params.classNum]);
      });
  }, [params.classNum]);

  const getRandomProblem = (problemSet) => {
    const randomIndex = Math.floor(Math.random() * problemSet.length);
    setCurrentProblem(problemSet[randomIndex]);
    setShowAnswer(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Matematički šah - {params.classNum}. Razred</h1>
      {currentProblem && (
        <div className="text-center">
          <p className="text-3xl mb-4">{currentProblem.question}</p>
          {showAnswer && <p className="text-2xl mb-4">Rješenje: {currentProblem.answer}</p>}
          <div className="flex space-x-4 mt-8">
            <button
              onClick={() => setShowAnswer(true)}
              className="bg-black text-white py-2 px-4 rounded-md text-lg hover:bg-gray-800 transition-colors"
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
      <Link href="/select-class" className="mt-8 text-lg underline">
        Odabir razreda
      </Link>
    </main>
  );
}
