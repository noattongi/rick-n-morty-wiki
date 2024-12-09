export const getCharacters = async(opts = {}) => {
  const urlParams = new URLSearchParams(opts);
  const res = await fetch(process.env.NEXT_PUBLIC_API_ROOT_URL + `/characters?${urlParams}`);
  console.log(res);
  const characters = res.json();
  return characters;
}

export const getCharacter = async(id) => {
  const characters = await fetch(process.env.NEXT_PUBLIC_API_ROOT_URL + `/character?id=${id}`)
  return characters.json();
}

export const getEpisodes = async() => {
  const episodes = await fetch(process.env.NEXT_PUBLIC_API_ROOT_URL + "/episodes")
  return episodes.json();
}