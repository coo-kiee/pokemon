// API
import { useGetEvolutionChain } from 'apis/poke-dex';

// Hook
import useLang from 'hooks/useLang';

// Util
import { extractPokemonEvolution } from 'utils/pokeDex/extractPokemonEvolution';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';

interface IPokeDexDetailEvolution {
  evolutionNum: number;
}
const PokeDexDetailEvolution = ({ evolutionNum }: IPokeDexDetailEvolution) => {
  const { convertLangs } = useLang();

  // Fetch
  const { data: evolutionChain } = useGetEvolutionChain(evolutionNum);
  console.log(evolutionChain.chain);
  const evolutionChains = extractPokemonEvolution(evolutionChain.chain);

  return <PokeDexDetailDescription title="진화정보" text={convertLangs('names', evolutionChains).join('-')} />;
};

export default PokeDexDetailEvolution;
