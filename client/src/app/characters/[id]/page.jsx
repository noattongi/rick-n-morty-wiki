import Link from 'next/link'
import {getCharacter} from '../../helpers/api.js'

export default async function CharacterShow ({ params }) {

  const {id} = await params
  const {character} = await getCharacter(id);

  if (character) {
    return (
      <div className="container mx-auto">
        <Link href="/">Home</Link>
        <Link href="/characters">Characters</Link>
        <img src={character.image} />
        <p>Name: {character.name}</p>
        <p>Species: {character.species}</p>
        <p>Gender: {character.gender}</p>
        <p>Status: {character.status}</p>
        <p>Origin: {character.location.name}</p>
      </div>
    )
  } else {
    return (
      <div className="container mx-auto">
        Something went wrong...
      </div>
    )
  }
}