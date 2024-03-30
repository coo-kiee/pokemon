// API
import { getPokemonList } from 'apis/poke-dex';

const PokeDex = () => {
  getPokemonList();

  return <div>PokeDex</div>;
};

export default PokeDex;
