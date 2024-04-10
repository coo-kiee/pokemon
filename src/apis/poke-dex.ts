import { useQuery, useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

// Const
import { API_URL } from 'consts/common';

// Type
import { EvolutionChain, Pokemon, ListResult, Species } from 'types';

// Util
import Axios from 'utils/axios';

const QUERY_KEY = {
  POKEMON_LIST: (lang: string, offset: number, limit: number) => ['pokemonList', lang, offset, limit],
  POKEMON_LIST_ONE: (pokemonId: number) => ['pokemonList', pokemonId],
  POKEMON: (pokemonId: number) => ['pokemon', pokemonId],
  SPECIES: (pokemonId: number) => ['species', pokemonId],
  EVOLUTION_CHAIN: (evolutionNum: number) => ['evolutionChain', evolutionNum],
};

interface IGetPokemonList {
  lang: string;
  pokemonListUrl: string;
  offset: number;
  limit: number;
}
const getPokemonList = async ({ lang, pokemonListUrl, offset, limit }: IGetPokemonList) => {
  const pokemonReqs = Array.from({ length: limit }).map((_, idx) =>
    Axios.get<Pokemon>(`${API_URL.POKEMON}/${offset + idx + 1}`),
  );

  const speciesReqs = Array.from({ length: limit }).map((_, idx) =>
    Axios.get<Species>(`${API_URL.SPECIES}/${offset + idx + 1}`),
  );

  const [{ results, next, previous }, ...otherResults] = await Promise.all([
    Axios.get<ListResult>(pokemonListUrl, { baseURL: '' }),
    ...pokemonReqs,
    ...speciesReqs,
  ]);

  const pokemonRes = otherResults.slice(0, pokemonReqs.length) as Pokemon[];
  const speciesRes = otherResults.slice(pokemonReqs.length) as Species[];

  return {
    results: results.map((result, idx) => ({
      ...result,
      name: speciesRes[idx].names.find((item) => item.language.name === lang)?.name || result.name,
      img: pokemonRes[idx].sprites.other['official-artwork'].front_default || pokemonRes[idx].sprites.front_default,
    })),
    next,
    previous,
  };
};
export const useGetPokemonList = (lang: string = 'ko', offset: number = 0, limit: number = 20) => {
  return useSuspenseInfiniteQuery({
    queryKey: QUERY_KEY.POKEMON_LIST(lang, offset, limit),
    queryFn: ({ pageParam }) => getPokemonList(pageParam),
    initialPageParam: {
      lang,
      pokemonListUrl: `${API_URL.BASE}${API_URL.POKEMON}?offset=${offset}&limit=${limit}`,
      offset,
      limit,
    },
    getNextPageParam: (data, _, lastPageParam) => {
      if (!data.next) return undefined;

      return {
        lang: lastPageParam.lang,
        limit: lastPageParam.limit,
        offset: lastPageParam.offset + lastPageParam.limit,
        pokemonListUrl: data.next,
      };
    },
    getPreviousPageParam: (data, _, firstPageParam) => {
      if (!data.previous) return undefined;

      return {
        lang: firstPageParam.lang,
        limit: firstPageParam.limit,
        offset: firstPageParam.offset - firstPageParam.limit,
        pokemonListUrl: data.previous,
      };
    },
    select(data) {
      const pokemonList = data.pages.flatMap((page) => page.results.map((result) => result));

      return { pokemonList };
    },
  });
};

export const useGetPokemonListOne = (pokemonId: number, lang: string = 'ko') => {
  return useQuery({
    queryKey: QUERY_KEY.POKEMON_LIST_ONE(pokemonId),
    queryFn: () =>
      getPokemonList({
        lang,
        offset: pokemonId - 1,
        limit: 1,
        pokemonListUrl: `${API_URL.BASE}${API_URL.POKEMON}?offset=${pokemonId - 1}&limit=1`,
      }),
    enabled: pokemonId > 0,
    select(data) {
      const pokemonListOne = data.results[0];
      return pokemonListOne;
    },
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
