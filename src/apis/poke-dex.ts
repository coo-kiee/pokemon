import { useSuspenseQuery } from '@tanstack/react-query';

// Type
import { EvolutionChain, Pokemon, PokemonList, Species } from 'types';

// Util
import Axios from 'utils/axios';

const QUERY_KEY = {
  POKEMON_LIST: () => ['pokemonList'],
  POKEMON: (pokemonId: number) => ['pokemon', pokemonId],
  SPECIES: (pokemonId: number) => ['species', pokemonId],
  EVOLUTION_CHAIN: (evolutionNum: number) => ['evolutionChain', evolutionNum],
};

export const useGetPokemonList = () => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.POKEMON_LIST(),
    queryFn: () => Axios.get<PokemonList>(`pokemon?offset=0&limit=100000`),
  });
};

export const useGetPokemon = (pokemonId: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.POKEMON(pokemonId),
    queryFn: () => Axios.get<Pokemon>(`pokemon/${pokemonId}`),
  });
};

export const useGetSpecies = (pokemonNum: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.SPECIES(pokemonNum),
    queryFn: () => Axios.get<Species>(`pokemon-species/${pokemonNum}`),
  });
};

export const useGetEvolutionChain = (evolutionNum: number) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.EVOLUTION_CHAIN(evolutionNum),
    queryFn: () => Axios.get<EvolutionChain>(`evolution-chain/${evolutionNum}`),
  });
};
