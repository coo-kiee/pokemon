import { useRef } from 'react';
import { Link } from 'react-router-dom';

// Style
import * as S from 'styles/pokeDexList';

// API
import { useGetPokemonList } from 'apis/poke-dex';

// Hook
import useSearchPokemonNum from 'hooks/useSearchPokemonNum';
import useFindPokemon from 'hooks/useSearchPokemon';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

// Util
import { checkInputNumber } from 'utils/checkInputNumber';

// URL
import { PAGE_URL } from 'consts/common';

// Component
import TopBtn from 'components/TopBtn';
import PokeDexListItem from './PokeDexListItem';

const PokeDexList = () => {
  const listItemRef = useRef<HTMLAnchorElement>(null);

  // Fetch
  const {
    data: { pokemonList },
    fetchNextPage,
  } = useGetPokemonList('ko');

  // Next Fetch
  useIntersectionObserver({
    target: listItemRef,
    callBack: fetchNextPage,
  });

  const { searchInputRef, searchPokemonNum, handleSearchPokemonNum } = useSearchPokemonNum();
  const { renderList } = useFindPokemon(pokemonList, searchPokemonNum);

  return (
    <S.PokeDexListContainer>
      <S.PokeDexListTitle>포켓몬 도감</S.PokeDexListTitle>
      <S.PokeDexListTopBox>
        <S.PokeDexListTopFuction>
          <button type="button">
            <Link to={PAGE_URL.HOEM}>홈으로</Link>
          </button>
        </S.PokeDexListTopFuction>
        <S.PokeDexListSearchBox onSubmit={handleSearchPokemonNum}>
          <S.PokeDexListSearchInputLabel>포켓몬 검색</S.PokeDexListSearchInputLabel>
          <S.PokeDexListSearchInput
            ref={searchInputRef}
            type="text"
            placeholder="포켓몬 번호를 입력하세요"
            onChange={checkInputNumber}
          />
          <S.PokeDexListSearchButton type="button" onClick={handleSearchPokemonNum}>
            검색
          </S.PokeDexListSearchButton>
        </S.PokeDexListSearchBox>
      </S.PokeDexListTopBox>
      <S.PokeDexListWrapper>
        {renderList?.map((item, index, arr) => (
          <PokeDexListItem
            key={item.name}
            pokemonInfo={item}
            listItemRef={index + 1 === arr.length ? listItemRef : undefined}
          />
        ))}
        {!renderList && <S.PokeDexListNone>검색 결과가 없습니다.</S.PokeDexListNone>}
      </S.PokeDexListWrapper>
      <TopBtn />
    </S.PokeDexListContainer>
  );
};

export default PokeDexList;
