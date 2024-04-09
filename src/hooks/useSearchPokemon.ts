// Type
import { ListResult } from 'types';

// Util
import { getPokemonNumFromUrl } from 'utils/pokeDex/getPokemonNumFromUrl';

const useFindPokemon = (pokemonList: ListResult['results'], searchPokemonNum: number) => {
  const findPokemon = pokemonList.find((item) => getPokemonNumFromUrl(item.url) === searchPokemonNum);

  if (searchPokemonNum > 0 && findPokemon) return { renderList: [findPokemon] };
  if (searchPokemonNum > 0 && !findPokemon) return { renderList: undefined };

  return { renderList: pokemonList };
};

export default useFindPokemon;
