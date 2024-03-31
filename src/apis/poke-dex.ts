import { useSuspenseQuery } from '@tanstack/react-query';

// Type
import { PokemonList } from 'types';

// Util
import Axios from 'utils/axios';

const QUERY_KEY = {
  POKEMON_LIST: () => ['pokemonList'],
  POKEMON: (pokemonNum: number) => ['pokemon', pokemonNum],
  EVOLUTION_CHAIN: (pokemonNum: number) => ['evolutionChain', pokemonNum],
};

export const useGetPokemonList = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.POKEMON_LIST(),
    queryFn: () => Axios.get<PokemonList>(`pokemon?offset=0&limit=100000`),
  });
};
