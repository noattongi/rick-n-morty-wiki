import Link from 'next/link'

export default function RootPage () {
  return (
    <div className="container mx-auto">
      <h1>Hi</h1>
      <Link href="/characters">
        Characters
      </Link>
      <Link href="/episodes">
        Episodes
      </Link>
    </div>
  )
}