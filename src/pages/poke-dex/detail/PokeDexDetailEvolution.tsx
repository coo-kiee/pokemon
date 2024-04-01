// API
import { useGetEvolutionChain } from 'apis/poke-dex';

// Util
import { extractPokemonEvolution } from 'utils/extractPokemonEvolution';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';

interface IPokeDexDetailEvolution {
  evolutionNum: number;
  pokemonName: string;
}
const PokeDexDetailEvolution = ({ evolutionNum, pokemonName }: IPokeDexDetailEvolution) => {
  // Fetch
  const { data: evolutionChain } = useGetEvolutionChain(evolutionNum);
  const evolutionChains = extractPokemonEvolution(evolutionChain.chain, [pokemonName]);

  return <PokeDexDetailDescription title="진화정보" text={evolutionChains.join('-')} />;
};

export default PokeDexDetailEvolution;
