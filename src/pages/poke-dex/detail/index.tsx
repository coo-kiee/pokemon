import { Link, useParams } from 'react-router-dom';

// Style
import * as S from 'styles/pokeDexDetail';

// URL
import { PAGE_URL } from 'consts/common';

// API
import { useGetPokemonDetail } from 'apis/pokeDex';

// Util

import { isNaturalNumber } from 'utils/validation';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';

const PokeDexDetail = () => {
  const { id = '' } = useParams();
  const pokemonId = isNaturalNumber(id) ? Number(id) : 0;

  // Fetch
  const {
    data: { img, name, abilities, types, weight, stats, evolutions },
  } = useGetPokemonDetail(pokemonId, 'ko');

  return (
    <S.PokeDexDetailContainer>
      <S.PokeDexDetailImg src={img} alt={name} />
      <PokeDexDetailDescription title="No" text={pokemonId} />
      <PokeDexDetailDescription title="Name" text={name} />
      <PokeDexDetailDescription title="Ability" text={abilities.join(', ')} />
      <PokeDexDetailDescription title="Type" text={types.join(', ')} />
      <PokeDexDetailDescription title="Weight" text={weight} />
      <PokeDexDetailDescription
        title="Evolution"
        render={() => (
          <S.PokeDexDetailEvolutionBox>
            {Object.values(evolutions).map((evolution, idx, arr) => (
              <S.PokeDexEvolutionLink
                key={evolution.id}
                to={`${PAGE_URL.POKE_DEX}/${evolution.id}`}
                $isCurrent={pokemonId === evolution.id}
              >
                {evolution.name}
                {idx + 1 !== arr.length && '-'}
              </S.PokeDexEvolutionLink>
            ))}
          </S.PokeDexDetailEvolutionBox>
        )}
      />
      <PokeDexDetailDescription title="Stat" text={stats.join('\n')} />
      <S.PokeDexDetailFunctionBox>
        <S.PokeDexDetailListBtn>
          <Link to={PAGE_URL.POKE_DEX}>목록</Link>
        </S.PokeDexDetailListBtn>
      </S.PokeDexDetailFunctionBox>
    </S.PokeDexDetailContainer>
  );
};

export default PokeDexDetail;
