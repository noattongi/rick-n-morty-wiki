"use client"

import { useState, useEffect, useRef } from 'react';
import { getCharacters } from '../../helpers/api.js'
import Link from 'next/link'

export default function CharacterScrollLoader({data}) {

  //first 20 characters are loaded from server
  const [characters, setCharacters] = useState(data);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [loading, setLoading] = useState(false);
  const loaderRef = useRef(null);

  const loadMoreCharacters = async() => {
    //TODO: scroll loading
    if (loading) return;

    setLoading(true);
    try {
      const page = pagesLoaded + 1;
      const nextPage = await getCharacters(page);
      if (nextPage.characters) {
        setCharacters(characters.concat(nextPage.characters));
      }
    } catch (error) {
      console.error("Error loading more characters", error);
    } finally {
      setLoading(false);
    }
  }

  //Observer setup and cleanup
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        loadMoreCharacters();
      }
    }, { threshold: 0.1 })

    const currentLoader = loaderRef.current;
    if (currentLoader) observer.observe(currentLoader);

    return () => {
      if (currentLoader) observer.unobserve(currentLoader);
    }
  }, [loaderRef, pagesLoaded])

  //increment pagesLoaded after new characters have been loaded
  useEffect(() => {
    setPagesLoaded(pagesLoaded + 1);
  }, [characters])

  return (
    <div key="characters" className="flex flex-wrap">
      {characters && characters.map(character =>
        <Link href={`/characters/${encodeURIComponent(character.id)}`}>
          <div className="w-42 p-3" key={character.id}>
            <img src={character.image} />
            <div key={character.id}>{character.name}</div>
          </div>
        </Link>
      )}
      <div ref={loaderRef} className="h-5 bg-transparent"/>
      {loading && <div>Loading...</div>}
    </div>
  )
}