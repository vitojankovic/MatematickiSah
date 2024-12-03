import Link from 'next/link'

export default function SelectClass() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Odabir razreda</h1>
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((classNum) => (
          <Link
            key={classNum}
            href={`/math-game/${classNum}`}
            className="bg-black text-white py-4 px-8 rounded-md text-2xl hover:bg-gray-800 transition-colors"
          >
            {classNum}.
          </Link>
        ))}
      </div>
    </main>
  )
}

