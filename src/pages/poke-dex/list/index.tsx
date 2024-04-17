import { Suspense, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

// Style
import * as S from 'styles/pokeDexList';

// API
import { useGetPokemonList } from 'apis/pokeDex';

// Hook
import useSearchPokemonNum from 'hooks/useSearchPokemonNum';
import useIntersectionObserver from 'hooks/useIntersectionObserver';

// Util
import { checkInputNumber } from 'utils/checkInputNumber';

// URL
import { PAGE_URL } from 'consts/common';

// Component
import TopBtn from 'components/TopBtn';
import Spinner from 'components/Spinner';
import ErrorFallback from 'components/error';
import PokeDexListItem from './PokeDexListItem';
import SearchResult from './SearchResult';

const PokeDexList = () => {
  const fetchTriggerRef = useRef<HTMLAnchorElement>(null);

  // Fetch
  const {
    data: { pokemonList },
    fetchNextPage,
  } = useGetPokemonList(0, 20, 'ko');

  // Next Fetch
  useIntersectionObserver({
    target: fetchTriggerRef,
    callBack: fetchNextPage,
  });

  const { searchInputRef, searchPokemonId, handleSearchPokemonId } = useSearchPokemonNum();

  return (
    <S.PokeDexListContainer>
      <S.PokeDexListTitle>포켓몬 도감</S.PokeDexListTitle>
      <S.PokeDexListTopBox>
        <S.PokeDexListTopFuction>
          <button type="button">
            <Link to={PAGE_URL.HOEM}>홈으로</Link>
          </button>
        </S.PokeDexListTopFuction>
        <S.PokeDexListSearchBox onSubmit={handleSearchPokemonId}>
          <S.PokeDexListSearchInputLabel>포켓몬 검색</S.PokeDexListSearchInputLabel>
          <S.PokeDexListSearchInput
            ref={searchInputRef}
            type="text"
            placeholder="포켓몬 번호를 입력하세요"
            defaultValue={searchPokemonId}
            onChange={checkInputNumber}
          />
          <S.PokeDexListSearchButton type="button" onClick={handleSearchPokemonId}>
            검색
          </S.PokeDexListSearchButton>
        </S.PokeDexListSearchBox>
      </S.PokeDexListTopBox>
      <S.PokeDexListWrapper>
        {searchPokemonId ? (
          <ErrorBoundary
            key={searchPokemonId}
            fallbackRender={(props) => <ErrorFallback {...props} shouldReset={false} />}
          >
            <Suspense
              fallback={
                <S.PokeDexListNone>
                  <Spinner />
                </S.PokeDexListNone>
              }
            >
              <SearchResult searchText={searchPokemonId} />
            </Suspense>
          </ErrorBoundary>
        ) : (
          pokemonList.map((item, index, arr) => (
            <PokeDexListItem
              key={item.name}
              pokemon={item}
              fetchTriggerRef={index + 1 === arr.length - 10 ? fetchTriggerRef : undefined}
            />
          ))
        )}
      </S.PokeDexListWrapper>
      <TopBtn />
    </S.PokeDexListContainer>
  );
};

export default PokeDexList;
