// Style
import * as S from 'styles/pokeDexList';

// API
import { useGetPokemonList } from 'apis/poke-dex';

// Hook
import useSearchPokemonNum from 'hooks/useSearchPokemonNum';
import useShowCnt from 'hooks/useShowCnt';
import useFindPokemon from 'hooks/useSearchPokemon';

// Util
import { checkInputNumber } from 'utils/checkInputNumber';

// Component
import PokeDexListItem from './PokeDexListItem';

const PokeDexList = () => {
  const { showCnt, triggerIncreaseShowCntRef } = useShowCnt();
  const { searchInputRef, searchPokemonNum, handleSearchPokemonNum } = useSearchPokemonNum();

  // Fetch
  const { data: pokemonList } = useGetPokemonList();

  const { renderList } = useFindPokemon(pokemonList, searchPokemonNum);

  return (
    <S.PokeDexListContainer>
      <S.PokeDexListTitle>포켓몬 도감</S.PokeDexListTitle>
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
      <S.PokeDexListWrapper>
        {renderList
          ?.filter((_, index) => index < showCnt)
          .map((item, index) => (
            <PokeDexListItem
              key={item.name}
              pokemonInfo={item}
              triggerIncreaseShowCntRef={index + 1 === showCnt ? triggerIncreaseShowCntRef : undefined}
            />
          ))}
        {!renderList && <S.PokeDexListNone>검색 결과가 없습니다.</S.PokeDexListNone>}
      </S.PokeDexListWrapper>
    </S.PokeDexListContainer>
  );
};

export default PokeDexList;
