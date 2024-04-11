import { useQuery, useSuspenseInfiniteQuery } from '@tanstack/react-query';

// Util
import Axios from 'apis/axios';
import { convertLang } from 'utils/convertLang';

// Const
import { API_URL } from 'consts/common';

// Type
import { ListResult } from 'types';

// API
import { getPokemon, getSpecies } from './pokeDetail';

const QUERY_KEY = {
  POKEMON_LIST: (lang: string, offset: number, limit: number) => ['pokemonList', lang, offset, limit],
  POKEMON_LIST_ONE: (pokemonId: number) => ['pokemonList', pokemonId],
};

interface IGetPokemonList {
  lang: string;
  pokemonListUrl: string;
  offset: number;
  limit: number;
}
const getPokemonList = async ({ lang, pokemonListUrl, offset, limit }: IGetPokemonList) => {
  const pokemonIndices = Array.from({ length: limit }, (_, idx) => offset + idx + 1);

  const [{ results, next, previous }, pokemonRes, speciesRes] = await Promise.all([
    Axios.get<ListResult>(pokemonListUrl, { baseURL: '' }),
    Promise.all(pokemonIndices.map((index) => getPokemon(index))),
    Promise.all(pokemonIndices.map((index) => getSpecies(index))),
  ]);

  return {
    results: results.map((result, idx) => ({
      ...result,
      id: pokemonRes[idx].id,
      img: pokemonRes[idx].sprites.other['official-artwork'].front_default || pokemonRes[idx].sprites.front_default,
      name: convertLang(speciesRes[idx], lang),
    })),
    next,
    previous,
  };
};

export const useGetPokemonList = (offset: number, limit: number, lang: string) => {
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

export const useGetPokemonListOne = (pokemonId: number, lang: string) => {
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
