// Style
import * as S from 'styles/pokeDexList';

// API
import { useGetPokemonDetail } from 'apis/pokeDex';

// Component
import PokeDexListItem from './PokeDexListItem';

interface ISearchResult {
  searchText: string;
}
const SearchResult = ({ searchText }: ISearchResult) => {
  // Fetch
  const { data: pokemonListOne } = useGetPokemonDetail(searchText, 'ko');

  return pokemonListOne ? (
    <PokeDexListItem pokemon={pokemonListOne} />
  ) : (
    <S.PokeDexListNone>검색 결과가 없습니다.</S.PokeDexListNone>
  );
};

export default SearchResult;
