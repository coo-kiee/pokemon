// Type
import { EvolutionChain } from 'types';

export const extractPokemonEvolution = (chain: EvolutionChain['chain'], pokemonNames: string[]) => {
  if (!chain.evolves_to.length) return pokemonNames;

  const evolutionInfo = chain.evolves_to[0];

  const evolutionNames = [...pokemonNames, evolutionInfo.species.name];
  if (evolutionInfo.evolves_to.length) return extractPokemonEvolution(evolutionInfo, evolutionNames);

  return evolutionNames;
};
