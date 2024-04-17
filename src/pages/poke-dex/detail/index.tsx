import { Link, useParams } from 'react-router-dom';

// Style
import * as S from 'styles/pokeDexDetail';

// URL
import { PAGE_URL } from 'consts/common';

// API
import { useGetPokemonDetail } from 'apis/pokeDex';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';

const PokeDexDetail = () => {
  const { search = '' } = useParams();

  // Fetch
  const { data: detail } = useGetPokemonDetail(search, 'ko');

  return (
    <S.PokeDexDetailContainer>
      <S.PokeDexDetailImg src={detail.img} alt={detail.name} />
      <PokeDexDetailDescription title="No" text={detail.id} />
      <PokeDexDetailDescription title="Name" text={detail.name} />
      <PokeDexDetailDescription title="Ability" text={detail.abilities.join(', ')} />
      <PokeDexDetailDescription title="Type" text={detail.types.join(', ')} />
      <PokeDexDetailDescription title="Weight" text={detail.weight} />
      <PokeDexDetailDescription
        title="Evolution"
        render={() => (
          <S.PokeDexDetailEvolutionBox>
            {Object.values(detail.evolutions).map((evolution, idx, arr) => (
              <S.PokeDexEvolutionLink
                key={evolution.id}
                to={`${PAGE_URL.POKE_DEX}/${evolution.id}`}
                $isCurrent={detail.id === evolution.id}
              >
                {evolution.name}
                {idx + 1 !== arr.length && '-'}
              </S.PokeDexEvolutionLink>
            ))}
          </S.PokeDexDetailEvolutionBox>
        )}
      />
      <PokeDexDetailDescription title="Stat" text={detail.stats.join('\n')} />
      <S.PokeDexDetailFunctionBox>
        <S.PokeDexDetailListBtn>
          <Link to={PAGE_URL.POKE_DEX}>목록</Link>
        </S.PokeDexDetailListBtn>
      </S.PokeDexDetailFunctionBox>
    </S.PokeDexDetailContainer>
  );
};

export default PokeDexDetail;
