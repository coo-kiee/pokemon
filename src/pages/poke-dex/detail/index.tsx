// Style
import * as S from 'styles/pokeDexDetail';

// API
import { useGetPokemon, useGetSpecies } from 'apis/poke-dex';

// Util
import { extractPokemonInfo } from 'utils/extractPokemonInfo';
import { getPokemonNumFromUrl } from 'utils/getPokemonNumFromUrl';

// Component
import PokeDexDetailDescription from './PokeDexDetailDescription';
import PokeDexDetailEvolution from './PokeDexDetailEvolution';

interface IPokeDexDetail {
  pokemonId: number;
}
const PokeDexDetail = ({ pokemonId }: IPokeDexDetail) => {
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
      <PokeDexDetailDescription title="이름" text={pokemon.name} />
      <PokeDexDetailDescription title="능력" text={abilities.join(', ')} />
      <PokeDexDetailDescription title="타입" text={types.join(', ')} />
      <PokeDexDetailEvolution evolutionNum={evolutionNum} pokemonName={pokemon.name} />
    </S.PokeDexDetailContainer>
  );
};

export default PokeDexDetail;
