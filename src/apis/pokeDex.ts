import { useSuspenseInfiniteQuery, useSuspenseQuery } from '@tanstack/react-query';

// Util
import Axios from 'apis/axios';
import { convertLang } from 'utils/convertLang';

// Const
import { API_URL } from 'consts/common';

// Type
import { Ability, EvolutionChain, ListResult, Pokemon, Species, Stat, Type } from 'types';

const QUERY_KEY = {
  Filter: () => ['filter'],
  POKEMON_LIST: (lang: string, offset: number, limit: number) => ['pokemonList', lang, offset, limit],
  DETAIL: (search: string, lang: string) => ['pokemonDetail', search, lang],
};

interface IGetPokemonList {
  lang: string;
  pokemonListUrl: string;
  offset: number;
  limit: number;
}

const getFromUrl = async <T>(url: string) => Axios.get(url, { baseURL: '' }) as Promise<T>;
const getPokemon = async (search: string) => Axios.get<Pokemon>(`${API_URL.POKEMON}/${search}`);
const getSpecies = async (search: string) => Axios.get<Species>(`${API_URL.SPECIES}/${search}`);

const getFilters = async (lang: string) => {
  const [{ count: typeCnt }, { count: abilityCnt }] = await Promise.all([
    Axios.get<ListResult>(`${API_URL.BASE}${API_URL.TYPE}?offset=0&limit=1`),
    Axios.get<ListResult>(`${API_URL.BASE}${API_URL.ABILITY}?offset=0&limit=1`),
  ]);

  const [{ results: typeRes }, { results: abilityRes }] = await Promise.all([
    Axios.get<ListResult>(`${API_URL.BASE}${API_URL.TYPE}?offset=0&limit=${typeCnt}`),
    Axios.get<ListResult>(`${API_URL.BASE}${API_URL.ABILITY}?offset=0&limit=${abilityCnt}`),
  ]);

  return {
    type: (await Promise.all(typeRes.map((result) => getFromUrl<Type>(result.url)))).map((type) => ({
      [convertLang(type, lang)]: false,
    })),
    ability: (await Promise.all(abilityRes.map((result) => getFromUrl<Ability>(result.url)))).map((ability) => ({
      [convertLang(ability, lang)]: false,
    })),
  };
};

export const useGetFilters = (lang: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.Filter(),
    queryFn: () => getFilters(lang),
  });
};

const getPokemonList = async ({ lang, pokemonListUrl, offset, limit }: IGetPokemonList) => {
  const pokemonIndices = Array.from({ length: limit }, (_, idx) => offset + idx + 1);

  const [{ results, next, previous }, pokemonResults, speciesResults] = await Promise.all([
    Axios.get<ListResult>(pokemonListUrl, { baseURL: '' }),
    Promise.all(pokemonIndices.map((index) => getPokemon(String(index)))),
    Promise.all(pokemonIndices.map((index) => getSpecies(String(index)))),
  ]);

  const [nestedAbilityReqs, nestedTypeReqs] = pokemonResults.reduce(
    (arr, pokemonResult) => {
      arr[0].push(pokemonResult.abilities.map((item) => getFromUrl<Ability>(item.ability.url)));
      arr[1].push(pokemonResult.types.map((item) => getFromUrl<Type>(item.type.url)));

      return arr;
    },
    [[] as Promise<Ability>[][], [] as Promise<Type>[][]],
  );

  const [nestedAbilityResults, nestedTypeResults] = await Promise.all([
    Promise.all(nestedAbilityReqs.map((abilityReqs) => Promise.all(abilityReqs))),
    Promise.all(nestedTypeReqs.map((typeReqs) => Promise.all(typeReqs))),
  ]);

  return {
    results: results.map((result, idx) => ({
      ...result,
      id: pokemonResults[idx].id,
      img:
        pokemonResults[idx].sprites.other['official-artwork'].front_default ||
        pokemonResults[idx].sprites.front_default,
      name: convertLang(speciesResults[idx], lang),
      abilities: nestedAbilityResults[idx].map((abilityResult) => convertLang(abilityResult, lang)),
      types: nestedTypeResults[idx].map((typeResult) => convertLang(typeResult, lang)),
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

const getPokemonDetail = async (search: string, lang: string) => {
  const [pokemon, species] = await Promise.all([getPokemon(search), getSpecies(search)]);

  const [evolution, abilityRes, typeRes, statRes] = await Promise.all([
    getFromUrl<EvolutionChain>(species.evolution_chain.url),
    Promise.all(pokemon.abilities.map((item) => getFromUrl<Ability>(item.ability.url))),
    Promise.all(pokemon.types.map((item) => getFromUrl<Type>(item.type.url))),
    Promise.all(pokemon.stats.map((item) => getFromUrl<Stat>(item.stat.url))),
  ]);

  const extractEvolutionUrls = (evolutionChain: EvolutionChain['chain'], arr: Promise<Species>[] = []) => {
    if (arr.length || evolutionChain.evolves_to.length) arr.push(getFromUrl<Species>(evolutionChain.species.url));
    if (evolutionChain.evolves_to.length) extractEvolutionUrls(evolutionChain.evolves_to[0], arr);

    return arr;
  };

  const [evolutionPokemonRes] = await Promise.all([Promise.all(extractEvolutionUrls(evolution.chain))]);

  return {
    id: pokemon.id,
    url: `${API_URL.BASE}${API_URL.POKEMON}/${search}`,
    weight: pokemon.weight,
    img: pokemon.sprites.other['official-artwork'].front_default,
    name: convertLang(species, lang),
    abilities: abilityRes.map((ability) => convertLang(ability, lang)),
    types: typeRes.map((type) => convertLang(type, lang)),
    stats: statRes.map((stat, idx) => `${convertLang(stat, lang)}: ${pokemon.stats[idx].base_stat}`),
    evolutions: evolutionPokemonRes.length
      ? evolutionPokemonRes.map((evolutionPokemon) => ({
          id: evolutionPokemon.id,
          name: convertLang(evolutionPokemon, lang),
        }))
      : [],
  };
};

export const useGetPokemonDetail = (search: string, lang: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.DETAIL(search, lang),
    queryFn: () => getPokemonDetail(search, lang),
  });
};
