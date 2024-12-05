import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-6xl font-bold mb-8">Matematicki šah</h1>
      <Link href="/select-class" className="bg-black text-white py-2 px-4 rounded-md text-lg hover:bg-gray-800 transition-colors">
        Kreni
      </Link>
      <p className="mt-8 text-sm">Autori: Amon Alija Salihbegović i Vito Janković</p>
    </main>
  )
}

