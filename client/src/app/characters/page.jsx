import Link from 'next/link'
import { getCharacters } from '../helpers/api.js'
import CharacterScrollLoader from './components/CharacterScrollLoader'

export default async function CharactersIndex () {

  const {characters} = await getCharacters();

  return (
    <div className="container mx-auto">
      <Link href="/">Home</Link>
      <h1>Characters</h1>
      <CharacterScrollLoader data={characters}/>
    </div>
  )
}