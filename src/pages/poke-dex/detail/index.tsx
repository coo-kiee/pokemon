import { Link, useParams } from 'react-router-dom';

// Style
import * as S from 'styles/pokeDexDetail';

// URL
import { PAGE_URL } from 'consts/common';

// API
import { useGetPokemon, useGetSpecies } from 'apis/pokeList';
import { useGetPokemonDetail } from 'apis/pokeDetail';

// Util
import { extractPokemonInfo, extractPokemonStat } from 'utils/pokeDex/extractPokemonInfo';
import { getPokemonNumFromUrl } from 'utils/pokeDex/getPokemonNumFromUrl';

// Hook
import useLang from 'hooks/useLang';

import { isNaturalNumber } from 'utils/validation';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';
import PokeDexDetailEvolution from './PokeDexDetailEvolution';

const PokeDexDetail = () => {
  const { id = '' } = useParams();
  const pokemonId = isNaturalNumber(id) ? Number(id) : 0;

  const { convertLang, convertLangs } = useLang();

  // Fetch
  const { data: pokemonDetail } = useGetPokemonDetail(pokemonId, 'ko');
  console.log(pokemonDetail);
  const { data: pokemon } = useGetPokemon(pokemonId);
  const { data: species } = useGetSpecies(pokemonId);
  const evolutionNum = getPokemonNumFromUrl(species.evolution_chain.url);

  const abilities = extractPokemonInfo(pokemon.abilities, 'ability');
  const types = extractPokemonInfo(pokemon.types, 'type');
  const moves = extractPokemonInfo(pokemon.moves, 'move');
  const [statNames, baseStats] = extractPokemonStat(pokemon.stats);

  return (
    <S.PokeDexDetailContainer>
      <S.PokeDexDetailImg src={pokemon.sprites.front_default} alt={pokemon.name} />
      <PokeDexDetailDescription title="번호" text={String(pokemon.id)} />
      <PokeDexDetailDescription title="이름" text={convertLang('names', pokemon.name)} />
      <PokeDexDetailDescription title="능력" text={convertLangs('abilities', abilities).join(', ')} />
      <PokeDexDetailDescription title="타입" text={convertLangs('types', types).join(', ')} />
      <PokeDexDetailDescription title="무게" text={String(pokemon.weight)} />
      <PokeDexDetailEvolution pokemonId={pokemonId} evolutionId={evolutionNum} />
      <PokeDexDetailDescription
        title="스탯"
        text={convertLangs('stats', statNames)
          .map((statName, idx) => `${statName}: ${baseStats[idx]}`)
          .join('\n')}
      />
      <PokeDexDetailDescription title="기술" text={convertLangs('moves', moves).join(', ')} />
      <S.PokeDexDetailFunctionBox>
        <S.PokeDexDetailListBtn>
          <Link to={PAGE_URL.POKE_DEX}>목록</Link>
        </S.PokeDexDetailListBtn>
      </S.PokeDexDetailFunctionBox>
    </S.PokeDexDetailContainer>
  );
};

export default PokeDexDetail;
