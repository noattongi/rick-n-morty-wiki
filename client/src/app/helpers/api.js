export const getCharacters = async(page = 1) => {
  const characters = await fetch(process.env.NEXT_PUBLIC_API_ROOT_URL + `/characters?page=${page}`);
  return characters.json();
}

export const getCharacter = async(id) => {
  const characters = await fetch(process.env.NEXT_PUBLIC_API_ROOT_URL + `/character?id=${id}`)
  return characters.json();
}

export const getEpisodes = async() => {
  const episodes = await fetch(process.env.NEXT_PUBLIC_API_ROOT_URL + "/episodes")
  return episodes.json();
}