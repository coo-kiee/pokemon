// API
import { useGetPokemonDetail } from 'apis/pokeDex';

// Component
import PokeDexListItem from './PokeDexListItem';

interface ISearchResult {
  searchText: string;
}
const SearchResult = ({ searchText }: ISearchResult) => {
  // Fetch
  const { data: pokemon } = useGetPokemonDetail(searchText, 'ko');

  return <PokeDexListItem pokemon={pokemon} />;
};

export default SearchResult;
