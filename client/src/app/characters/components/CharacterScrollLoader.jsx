"use client"

import { useState, useEffect, useRef } from 'react';
import { getCharacters } from '../../helpers/api.js'
import Link from 'next/link'

export default function CharacterScrollLoader({data, search}) {

  //first 20 characters are loaded from server
  const [characters, setCharacters] = useState(data);
  const [pagesLoaded, setPagesLoaded] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState(search);
  const [endOfList, setEndOfList] = useState(false);
  const loaderRef = useRef(null);

  const loadMoreCharacters = async() => {
    if (loading || endOfList) return;
    console.log("Turn off loader?: ", (loading || endOfList))
    await setLoading(true);
    try {
      const page = pagesLoaded + 1;
      const nextPage = await getCharacters({page: page, query: searchQuery});
      console.log(nextPage.characters)
      if (nextPage.characters && nextPage.characters.length !== 0) {
        setCharacters(characters.concat(nextPage.characters));
      } else {
        console.log("turning off loader")
        setEndOfList(true);
      }
    } catch (error) {
      console.error("Error loading more characters", error);
    } finally {
      setLoading(false);
    }
  }

  const searchCharactersByName = async(e) => {
    e.preventDefault();
    setEndOfList(false);
    if (!searchQuery || searchQuery.trim() === "") {
      setPagesLoaded(1);
    } else {
      try {
        const results = await getCharacters({query: searchQuery});
        if (results.characters) {
          setCharacters(results.characters);
          setPagesLoaded(1);
        }
      } catch (error) {
        console.error("Error searching for characters", error);
      } finally {};
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
    <>
      <form onSubmit={searchCharactersByName}>
        <input type="text" placeholder="Search..." onChange={(e) => setSearchQuery(e.target.value)}/>
        <button type="submit">Go</button>
      </form>
      <div key="characters" className="flex flex-wrap">
        {characters && characters.map(character =>
          <Link key={character.id} href={`/characters/${encodeURIComponent(character.id)}`}>
            <div className="w-42 p-3" >
              <img src={character.image} />
              <div>{character.name}</div>
            </div>
          </Link>
        )}
        {endOfList ? <div>End of List</div> : <div ref={loaderRef} className="h-5 bg-transparent"/>}
        {loading && <div>Loading...</div>}
      </div>
    </>
  )
}