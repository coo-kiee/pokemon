import Axios from 'utils/axios';

import { API_URL } from 'consts/common';

import { Ability, EvolutionChain, Names, Pokemon, Species, Stat, Type } from 'types';
import { useSuspenseQuery } from '@tanstack/react-query';
import { convertLang } from 'utils/convertLang';

const QUERY_KEY = {
  DETAIL: (pokemonId: number, lang: string) => ['pokemonDetail', pokemonId, lang],
};

export const getPokemon = async (pokemonId: number) => {
  return Axios.get<Pokemon>(`${API_URL.POKEMON}/${pokemonId}`);
};

export const getSpecies = async (pokemonId: number) => {
  return Axios.get<Species>(`${API_URL.SPECIES}/${pokemonId}`);
};

const getDetailFromUrl = async <T>(url: string) => {
  return Axios.get(url, { baseURL: '' }) as Promise<T>;
};

const getPokemonDetail = async (pokemonId: number, lang: string) => {
  const [pokemon, species] = await Promise.all([getPokemon(pokemonId), getSpecies(pokemonId)]);

  const [evolution, abilityRes, typeRes, statRes] = await Promise.all([
    getDetailFromUrl<EvolutionChain>(species.evolution_chain.url),
    Promise.all(pokemon.abilities.map((item) => getDetailFromUrl<Ability>(item.ability.url))),
    Promise.all(pokemon.types.map((item) => getDetailFromUrl<Type>(item.type.url))),
    Promise.all(pokemon.stats.map((item) => getDetailFromUrl<Stat>(item.stat.url))),
  ]);

  const extractEvolutionUrls = (evolutionChain: EvolutionChain['chain'], arr: Promise<Species>[] = []) => {
    arr.push(getDetailFromUrl<Species>(evolutionChain.species.url));
    if (evolutionChain.evolves_to.length) extractEvolutionUrls(evolutionChain.evolves_to[0], arr);

    return arr;
  };

  const [evolutionPokemonRes] = await Promise.all([Promise.all(extractEvolutionUrls(evolution.chain))]);

  const name = convertLang(species, lang);
  const abilities = abilityRes.map((ability) => convertLang(ability, lang));
  const types = typeRes.map((type) => convertLang(type, lang));
  const stats = statRes.map((stat, idx) => `${convertLang(stat, lang)}: ${pokemon.stats[idx].base_stat}`);
  const evolutions =
    evolutionPokemonRes.length > 1
      ? evolutionPokemonRes.map((evolutionPokemon) => convertLang(evolutionPokemon, lang))
      : [];

  return {
    name,
    abilities,
    types,
    stats,
    evolutions,
  };
};

export const useGetPokemonDetail = (pokemonId: number, lang: string) => {
  return useSuspenseQuery({
    queryKey: QUERY_KEY.DETAIL(pokemonId, lang),
    queryFn: () => getPokemonDetail(pokemonId, lang),
  });
};
