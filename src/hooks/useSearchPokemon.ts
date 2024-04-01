// Type
import { PokemonList } from 'types';

// Util
import { getPokemonNumFromUrl } from 'utils/getPokemonNumFromUrl';

const useFindPokemon = (pokemonList: PokemonList, searchPokemonNum: number) => {
  const findPokemon = pokemonList.results.find((item) => getPokemonNumFromUrl(item.url) === searchPokemonNum);

  if (searchPokemonNum > 0 && findPokemon) return { renderList: [findPokemon] };
  if (searchPokemonNum > 0 && !findPokemon) return { renderList: undefined };

  return { renderList: pokemonList.results };
};

export default useFindPokemon;
