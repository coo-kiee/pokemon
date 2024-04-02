import { Link } from 'react-router-dom';

// Style
import * as S from 'styles/pokeDexDetail';

// URL
import { PAGE_URL } from 'consts/common';

// API
import { useGetPokemon, useGetSpecies } from 'apis/poke-dex';

// Util
import { extractPokemonInfo } from 'utils/pokeDex/extractPokemonInfo';
import { getPokemonNumFromUrl } from 'utils/pokeDex/getPokemonNumFromUrl';

// Hook
import useLang from 'hooks/useLang';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';
import PokeDexDetailEvolution from './PokeDexDetailEvolution';

interface IPokeDexDetail {
  pokemonId: number;
}
const PokeDexDetail = ({ pokemonId }: IPokeDexDetail) => {
  const { convertLang, convertLangs } = useLang();

  // Fetch
  const { data: pokemon } = useGetPokemon(pokemonId);
  const { data: species } = useGetSpecies(pokemonId);
  const evolutionNum = getPokemonNumFromUrl(species.evolution_chain.url);

  const abilities = extractPokemonInfo(pokemon.abilities, 'ability');
  const types = extractPokemonInfo(pokemon.types, 'type');

  return (
    <S.PokeDexDetailContainer>
      <S.PokeDexDetailImg src={pokemon.sprites.front_default} alt={pokemon.name} />
      <PokeDexDetailDescription title="번호" text={String(pokemon.id)} />
      <PokeDexDetailDescription title="이름" text={convertLang('names', pokemon.name)} />
      <PokeDexDetailDescription title="능력" text={convertLangs('abilities', abilities).join(', ')} />
      <PokeDexDetailDescription title="타입" text={convertLangs('types', types).join(', ')} />
      <PokeDexDetailEvolution evolutionNum={evolutionNum} />
      <S.PokeDexDetailFunctionBox>
        <S.PokeDexDetailListBtn>
          <Link to={PAGE_URL.POKE_DEX}>목록</Link>
        </S.PokeDexDetailListBtn>
      </S.PokeDexDetailFunctionBox>
    </S.PokeDexDetailContainer>
  );
};

export default PokeDexDetail;
