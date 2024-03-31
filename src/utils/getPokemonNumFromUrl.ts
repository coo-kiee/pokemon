import { POKE_API_URL } from 'consts/common';

export const getPokemonNumFromUrl = (url: string) => {
  const reg = new RegExp(`${POKE_API_URL}pokemon/(\\d+)/`);
  const pokemonNum = url.replace(reg, '$1');

  return pokemonNum;
};
