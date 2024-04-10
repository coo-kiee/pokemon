// Style
import * as S from 'styles/pokeDexList';

// API
import { useGetPokemonListOne } from 'apis/poke-dex';

// Component
import Spinner from 'components/Spinner';
import PokeDexListItem from './PokeDexListItem';

interface ISearchResult {
  searchPokemonId: string;
}
const SearchResult = ({ searchPokemonId }: ISearchResult) => {
  // Fetch
  const { data: pokemonListOne, isFetching: isListOneFetching } = useGetPokemonListOne(Number(searchPokemonId), 'ko');

  if (isListOneFetching) {
    return (
      <S.PokeDexListNone>
        <Spinner />
      </S.PokeDexListNone>
    );
  }

  return pokemonListOne ? (
    <PokeDexListItem pokemonInfo={pokemonListOne} />
  ) : (
    <S.PokeDexListNone>검색 결과가 없습니다.</S.PokeDexListNone>
  );
};

export default SearchResult;
