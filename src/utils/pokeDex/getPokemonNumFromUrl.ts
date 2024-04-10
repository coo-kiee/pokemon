import { API_URL } from 'consts/common';

export const getPokemonNumFromUrl = (url: string) => {
  const reg = new RegExp(`${API_URL.BASE}/\\D+/(\\d+)/`);

  const pokemonNum = url.replace(reg, '$1');

  return Number(pokemonNum);
};
