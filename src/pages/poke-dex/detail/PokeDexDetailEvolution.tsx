import { Fragment } from 'react';
import * as S from 'styles/pokeDexDetail';

// API
import { useGetEvolutionChain } from 'apis/poke-dex';

// Hook
import useLang from 'hooks/useLang';

// Util
import { extractPokemonEvolution } from 'utils/pokeDex/extractPokemonEvolution';
import { getPokemonNumFromUrl } from 'utils/pokeDex/getPokemonNumFromUrl';

// URL
import { PAGE_URL } from 'consts/common';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';

interface IPokeDexDetailEvolution {
  pokemonId: number;
  evolutionId: number;
}
const PokeDexDetailEvolution = ({ pokemonId, evolutionId }: IPokeDexDetailEvolution) => {
  const { convertLang } = useLang();

  // Fetch
  const { data: evolutionChain } = useGetEvolutionChain(evolutionId);
  const evolutionSpecies = extractPokemonEvolution(evolutionChain.chain);

  return (
    <PokeDexDetailDescription
      title="진화"
      render={() => (
        <S.PokeDexDetailEvolutionBox>
          {evolutionSpecies.map((species, idx) => (
            <Fragment key={species.name}>
              {idx > 0 ? '-' : ''}
              <S.PokeDexEvolutionLink
                to={`${PAGE_URL.POKE_DEX}/${getPokemonNumFromUrl(species.url)}`}
                $isCurrent={pokemonId === getPokemonNumFromUrl(species.url)}
              >
                {convertLang('names', species.name)}
              </S.PokeDexEvolutionLink>
            </Fragment>
          ))}
        </S.PokeDexDetailEvolutionBox>
      )}
    />
  );
};

export default PokeDexDetailEvolution;
