// Type
import { EvolutionChain } from 'types';

export const extractPokemonEvolution = (chain: EvolutionChain['chain'], pokemonNames: string[] = []) => {
  const evolutionInfo = chain.evolves_to;
  const hasEvolutionInfo = chain.evolves_to.length;

  if (hasEvolutionInfo) {
    pokemonNames.push(chain.species.name);
    extractPokemonEvolution(evolutionInfo[0], pokemonNames);
  }

  if (pokemonNames.length && !hasEvolutionInfo) pokemonNames.push(chain.species.name);

  return pokemonNames;
};
