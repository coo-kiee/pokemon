// Type
import { EvolutionChain } from 'types';

export const extractPokemonEvolution = (
  chain: EvolutionChain['chain'],
  evolutionChains: EvolutionChain['chain']['species'][] = [],
) => {
  const evolutionInfo = chain.evolves_to;
  const hasEvolutionInfo = chain.evolves_to.length;

  if (hasEvolutionInfo) {
    evolutionChains.push(chain.species);
    extractPokemonEvolution(evolutionInfo[0], evolutionChains);
  }

  if (evolutionChains.length && !hasEvolutionInfo) evolutionChains.push(chain.species);

  return evolutionChains;
};
